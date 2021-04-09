const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 54321;
const fs = require('fs');
var cors = require('cors');

const start = async (config) => {

  app.use(bodyParser.json());
  app.use('/debug', express.static('ui/build'));
  app.use(cors());

  console.log(`Starting Visual Debugger...`);

  try {

    app.get('/status', (req, res) => {
      res.send('Visual Debugger is listening...');
    });

    app.get('/artifacts', (req, res) => {

      const contractPath = config.contracts_build_directory || "../sample";
      const artifacts = [];
      
      fs.readdirSync(`${__dirname}/${contractPath}/`).forEach(file => {
        data = fs.readFileSync(`${__dirname}/${contractPath}/${file}`, "utf8");
        artifacts.push(JSON.parse(data));
      });

      res.json(artifacts);
    });
    
    app.use(function(req, res) {
      res.redirect('/debug');
    });

    app.listen(port, () => {
      console.log(`Started and listening at http://localhost:${port}`)
    });

  } catch (err) {
    console.log(`An error occurred starting the listener:\n\n${err}`);
  }

}

module.exports = start;