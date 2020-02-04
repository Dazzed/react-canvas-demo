const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

const config = {
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: 'tiny',
};

app.use(morgan(config.LOG_LEVEL));
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(config.PORT, () => {
  console.log(`App started on port: ${config.PORT}`);
});
