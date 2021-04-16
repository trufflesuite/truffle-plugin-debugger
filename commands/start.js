const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 54321;
const fs = require('fs');
var cors = require('cors');

const debug = async (config) => {

  app.use(bodyParser.json());
  app.use('/debug', express.static(`${__dirname}/../ui/build`));
  app.use(cors());

  console.log(`Starting Visual Debugger...`);

  try {

    app.get('/test', (req, res) => {

      res.send(`${__dirname}/../ui/build`);

    });

    app.get('/status', (req, res) => {
      res.send('Visual Debugger is listening...');
    });

    app.get('/artifacts', (req, res) => {

      const contractPath = config.contracts_build_directory || `${__dirname}/sample/`;
      const artifacts = [];
      
      fs.readdirSync(contractPath).forEach(file => {
        if (file === ".DS_Store") return; // TODO - a more elegant exclusion list
        
        data = fs.readFileSync(`${contractPath}/${file}`, "utf8");
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

module.exports = debug;