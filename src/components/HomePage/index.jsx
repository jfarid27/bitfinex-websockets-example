import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {
  websocketRequestOpen,
  websocketRequestClose,
  websocketOnOpen,
  websocketOnClose,
  websocketOnError
} from '../../actions';
import _ from 'lodash';
import BookVisualization from './../BookVisualization';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.count = 0;
    this.state = {
      book: {
        bids: {},
        asks: {},
        psnap: {}
      },
      count: 0
    };
  }

  componentDidMount() {
    this.connectionIntervalId = setInterval(() => {
      if (this.props.open) return;
      this.connectSocket();
    }, 4000);
  }

  connectSocket() {
    if (this.props.pending || this.props.open) return;
    const address = "wss://api.bitfinex.com/ws/2";
    this.props.websocketRequestOpen();
    this.cli = new WebSocket(address, 'echo-protocol');
    this.cli.onmessage = this.handleIncomingMessage.bind(this);
    this.cli.onopen = this.handleOpen.bind(this);
    this.cli.onerror = this.handleError.bind(this);
    this.cli.onclose = this.handleClose.bind(this);
  }

  handleError(info) {
    clearInterval(this.connectionIntervalId);
    this.props.websocketOnError();
  }

  handleClose() {
    this.props.websocketOnClose();
  }

  handleOpen() {
    const pair = "ETHUSD";
    this.cli.send(JSON.stringify({ event: "subscribe", channel: "book", pair: pair, prec: "P0" }));
    this.props.websocketOnOpen();
  }

  handleIncomingMessage(msg) {
    msg = JSON.parse(msg.data);

    if (msg.event || (msg[1] === 'hb')) return;
    this.setState(this.updateBook(msg).bind(this));
    return;
  }

  updateBook(msg) {
    return (state) => { 
      let updated = Object.assign({}, state);
      let BOOK = updated.book;
      
      if (updated.count === 0) {
        _.each(msg[1], function(pp) {
          pp = { price: pp[0], cnt: pp[1], amount: pp[2] }
          const side = pp.amount >= 0 ? 'bids' : 'asks'
          pp.amount = Math.abs(pp.amount)
          BOOK[side][pp.price] = pp
        })
      } else {
        let pp = { price: msg[1][0], cnt: msg[1][1], amount: msg[1][2], ix: msg[1][3] }
        console.log(pp)
        if (!pp.cnt) {
          let found = true
          if (pp.amount > 0) {
            if (BOOK['bids'][pp.price]) {
              delete BOOK['bids'][pp.price]
            } else {
              found = false
            }
          } else if (pp.amount < 0) {
            if (BOOK['asks'][pp.price]) {
              delete BOOK['asks'][pp.price]
            } else {
              found = false
            }
          }
          if (!found) {
            console.log("Found error");
          }
        } else {
          let side = pp.amount >= 0 ? 'bids' : 'asks'
          pp.amount = Math.abs(pp.amount)
          BOOK[side][pp.price] = pp
        } 
      }

      _.each(['bids', 'asks'], function(side) {
        let sbook = BOOK[side];
        let bprices = Object.keys(sbook);

        let prices = bprices.sort(function(a, b) {
          if (side === 'bids') {
            return +a >= +b ? -1 : 1;
          } else {
            return +a <= +b ? -1 : 1;
          }
        });

        BOOK.psnap[side] = prices;
      });

      updated.count++;
      return updated;
    };
  }

  componentWillUnmount() {
    clearInterval(this.connectionIntervalId);
  }

  requestClose() {
    this.props.websocketRequestClose()
    clearInterval(this.connectionIntervalId);
    this.cli.close();
  }

  render(props) {
    const style = {
      width: 510,
      height: 500,
    };


    const buttonWrapperStyle = {
      float: 'right',
      height: '1.5em',
    };

    return (<div id='home'>
        <div className='price-controls'>
          { (!this.props.closed ?  
              (this.props.open ?
                (this.state.book.psnap.asks && `Price: ${this.state.book.psnap.asks[0]}`) :
                "Loading") :
            `Pricing Closed. Last Ask Price: ${this.state.book.psnap.asks[0]}`)
          }
          <RaisedButton
            backgroundColor={'lightgrey'}
            style={buttonWrapperStyle}
            label={'Close'}
            onClick={() => this.requestClose()} />
        </div>
      { (!this.props.closed ?  
          (this.props.open ?
            <BookVisualization book={this.state.book} style={style} /> :
            <CircularProgress />) :
        <BookVisualization book={this.state.book} style={style} />)
      }
    </div>);
  }
}

const mapStateToProps = function (state) {
  return ({
    pending: state.websocketReducer.pending,
    open: state.websocketReducer.open,
    closed: state.websocketReducer.closed,
    error: state.websocketReducer.error,
  });
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  websocketRequestOpen,
  websocketRequestClose,
  websocketOnOpen,
  websocketOnClose,
  websocketOnError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
