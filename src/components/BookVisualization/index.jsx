import React, { Component } from 'react';
import { select } from 'd3';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';

export default class BookVisualization extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(props) {
    this.clearVis();
    this.buildVis();
  }

  componentDidMount() {
    this.buildVis();
  }

  clearVis() {
    select(this.svgNode).selectAll('*').remove();
  }

  buildVis() {
    const vis = select(this.svgNode);

    if (!(this.props.book.psnap.asks || this.props.book.psnap.bids)) return;
    const askData = this.props.book.psnap.asks
      .map(key => this.props.book.asks[+key])
      .reduce((agg, pp) => {
        pp.total = (pp.amount + agg.total); 
        agg.total = pp.total;
        agg.results.push(pp);
        return agg;
      }, {results: [], total: 0});

    const bidData = this.props.book.psnap.bids
      .map(key => this.props.book.bids[+key])
      .reduce((agg, pp) => {
        pp.total = (pp.amount + agg.total); 
        agg.total = pp.total;
        agg.results.push(pp);
        return agg;
      }, {results: [], total: 0});

    const yAsk = scaleBand()
      .domain(askData.results.map(d => d.price))
      .rangeRound([this.props.style.height, 0]);

    const yBid = scaleBand()
      .domain(bidData.results.map(d => d.price))
      .rangeRound([this.props.style.height, 0]);

    const xScale = scaleLinear()
      .domain([0, askData.total + bidData.total])
      .range([0, this.props.style.width/2]);

    const bidBars = vis
        .append('g')
        .attr('class', 'bid-bars')
      .selectAll('rect')
        .data(bidData.results);

    const askBars = vis
        .append('g')
        .attr('class', 'ask-bars')
      .selectAll('rect')
        .data(askData.results);

    bidBars
      .enter()
      .append('rect')
      .attr('x', d => (this.props.style.width/2) - xScale(d.total))
      .attr('y', (d) => this.props.style.height - yBid(d.price))
      .attr('height', 0.83 * yBid.bandwidth())
      .attr('width', d => xScale(d.total))
      .attr('fill', 'green');

    askBars
      .enter()
      .append('rect')
      .attr('x', this.props.style.width/2)
      .attr('y', (d) => this.props.style.height - yAsk(d.price))
      .attr('height', 0.83 * yAsk.bandwidth())
      .attr('width', d => xScale(d.total))
      .attr('fill', 'red');

    vis.append('g')
      .attr('class', 'ask-totals-text')
      .selectAll('text')
        .data(askData.results)
        .enter()
        .append('text')
          .attr('fill', 'white')
          .attr('text-anchor', 'start')
          .attr('x', (this.props.style.width / 2) + 5)
          .attr('y', (d) => this.props.style.height - yAsk(d.price) - 5)
          .html(d => this.shorten(d.total));

    vis.append('g')
      .attr('class', 'bid-totals-text')
      .selectAll('text')
        .data(bidData.results)
        .enter()
        .append('text')
          .attr('fill', 'white')
          .attr('text-anchor', 'end')
          .attr('x', (this.props.style.width / 2) - 5)
          .attr('y', (d) => this.props.style.height - yBid(d.price) - 5)
          .html(d => this.shorten(d.total));

    vis.append('g')
      .attr('class', 'ask-price-text')
      .selectAll('text')
        .data(askData.results)
        .enter()
        .append('text')
          .attr('fill', 'white')
          .attr('text-anchor', 'end')
          .attr('x', (this.props.style.width))
          .attr('y', (d) => this.props.style.height - yAsk(d.price) - 5)
          .html(d => d.price);

    vis.append('g')
      .attr('class', 'bid-price-text')
      .selectAll('text')
        .data(bidData.results)
        .enter()
        .append('text')
          .attr('fill', 'white')
          .attr('text-anchor', 'start')
          .attr('x', 5)
          .attr('y', (d) => this.props.style.height - yBid(d.price) - 5)
          .html(d => d.price);
        
  }

  shorten(d) {
    return Math.floor(d * 100) / 100;
  }

  render() {
    const style = Object.assign({}, this.props.style);
    return <div className='book-visualization' ref={(node) => (this.node = node)}>
      <svg ref={(node) => this.svgNode = node } style={style} />
    </div>
  }
}
