import express from 'express';
const port = 5900;
const app = express();
app.get('/', (req, res) => {
   res.send('apple');
});
app.listen(port, () => {
   console.log('Server is running ...');
});
