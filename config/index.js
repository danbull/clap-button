const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  viewId: process.env.VIEW_ID,
};
