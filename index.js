const express = require('express');

const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.listen(port, () => {
    console.log(`Application running on port: ${port}`)
});
