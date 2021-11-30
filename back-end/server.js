const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.send('Here is the response to your POST, man!\n');
});

app.put('/', (req, res) => {
    res.send('I am updated.\n');
});

app.delete('/', (req, res) => {
    res.send('All my memories have been deleted. Are you happy now?\n');
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
