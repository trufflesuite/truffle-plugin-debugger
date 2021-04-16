require("dotenv").config();

const debug = require("./commands/start");

module.exports = (config) => {

  if (config.help) {
    console.log(`Usage: truffle run debug [command]`);
    console.log(`Commands: debug`);
    return;
  }

  if (config._.length < 2) {
    console.log("No command provided. Run truffle run debug --help to see the full list.");
    return;
  }

  switch (config._[1]) {
    case "start":
      debug(config);
      break;
    default:
      console.log("Command not found. Run truffle run debug --help to see the full list.");
  }
}
