const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 54321;
const fs = require('fs');

const start = async (config) => {

  app.use(bodyParser.json());
  app.use('/debug', express.static('ui/build'))

  console.log(`Starting Visual Debugger...`);

  try {

    app.get('/status', (req, res) => {
      res.send('Visual Debugger is listening...');
    });

    app.get('/artifacts', (req, res) => {
      res.send(config.build_directory);
    });

    // TODO return a list of all of them
    // axios / fetch on the client to get what's needed :)

    // // sync config
    // app.post('/config', (req, res) => {
    // });

    // // sync artifacts
    // app.post('/', (req, res) => {
    //   const newNetwork = req.body.network;
    //   const newAddress = req.body.address;
    //   const contractPath = config.contracts_build_directory;

    //   console.log(`Updating ${newNetwork} & ${newAddress}...`);
      
    //   fs.readFile(`${contractPath}/SimpleStorage.json`, "utf8", function(err, data) {
    //     if (err) return console.log(err);

    //     const artifact = JSON.parse(data);

    //     const newOrUpdatedEntry = {
    //       events: {},
    //       links: {},
    //       address: newAddress,
    //       transactionHash: '0x'
    //     };

    //     artifact.networks[newNetwork] = newOrUpdatedEntry;
  
    //     fs.writeFile(`${contractPath}/SimpleStorage.json`, JSON.stringify(artifact, null, 2), function writeJSON(err) {
    //       if (err) return console.log(err);

    //       console.log(`Artifacts successfully updated :)`);
    //       res.json({status: `updated`});
    //     });
    //   });

    // });
    
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