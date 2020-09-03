const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const getData = require('./api/ga.js');
const { port } = require('./config/index.js');

const app = express();
app.use(cors());
const server = createServer(app);

app.get('/claps', (req, res) => {
  const { post, startDate, endDate } = req.query;

  console.log(`Requested post: ${post}`);
  console.log(`Requested start-date: ${startDate}`);
  console.log(`Requested end-date: ${endDate}`);

  getData(post, startDate, endDate)
    .then((data) => {
      res.send({ data: Object.values(data)[0] });
      console.log('Done');
    })
    .catch((err) => {
      console.log('Error:');
      console.log(err);
      res.send({
        status: 'Error getting Google Analytics data',
        message: `${err}`,
      });
      console.log('Done');
    });
});

server.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
