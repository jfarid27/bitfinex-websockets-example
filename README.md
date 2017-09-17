## Order Book Module

### Quick start

```bash npm install; npm start```

### DevEnv

This code is compiled with webpack, and needs a run of webpack before ``` npm start``` is ran.

### Comments

The main page is in the Homepage component, and some actions are added along with global state to maintain information
about the websocket connection. The BookVisualization is a component that uses d3 to visualize the book information in
a graph. The only numbers shown are the aggregate totals and the price level.

With the time constraints, important features were focused on, but with more time I would have liked to improve the UI,
as well as adding more development features. On my current project, our DevEnvironment includes the webpack-server, which
would have been a nice addition, but would have been an over-optimization for this one-off widget. 
