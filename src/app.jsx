import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers';
import HomePage from './components/HomePage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function App() {
  return (<MuiThemeProvider>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </MuiThemeProvider>);
}

render(React.createElement(App), document.getElementById('app'));
