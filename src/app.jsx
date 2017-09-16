import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers';
import HomePage from './components/HomePage';

const App = (props) => <div>
  <Provider store={store}>
    <HomePage />
  </Provider>
</div>;

render(React.createElement(<App />, document.getElementById('app')));
