require('dotenv').config();

// Server
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').createServer(app);

// Services
const { getData } = require('./libraries/gAnalytics');

// Config
const port = process.env.SERVER_PORT;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api', (req, res) => {
  console.log('req.query', req.query);
  const { metrics, startDate, endDate, filters } = req.query;
  console.log(`Requested metrics: ${metrics}`);
  console.log(`Requested filters: ${filters}`);
  console.log(`Requested start-date: ${startDate}`);
  console.log(`Requested end-date: ${endDate}`);

  Promise.all(
    getData(metrics ? metrics.split(',') : metrics, startDate, endDate, filters)
  )
    .then((data) => {
      // flatten list of objects into one object
      const body = {};
      Object.values(data).forEach((value) => {
        Object.keys(value).forEach((key) => {
          body[key] = value[key];
        });
      });

      res.send({ data: body });

      console.log('Done');
    })
    .catch((err) => {
      console.log('Error:');
      console.log(err);
      res.send({ status: 'Error getting a metric', message: `${err}` });
      console.log('Done');
    });
});

server.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
