## Order Book Module

### Quick start

```bash npm install; npm start```

### DevEnv

This code is compiled with webpack, and needs a run of webpack before ``` npm start``` is ran. For development, use ```npm run watch``` alongside ```npm start```.

### Comments

The main page is in the Homepage component, and some actions are added along with global state to maintain information
about the websocket connection. The BookVisualization is a component that uses d3 to visualize the book information in
a graph. The only numbers shown are the aggregate totals and the price level.

Important features were focused on, but I would like to improve the UI, as well as adding
more development features. A ```webpack-dev-server``` would probably be the best addition for fast
turnaround with building the program, but for now, ```webpack --watch``` is used to develop.
