# Truffle Debugger

Debug all the things!

> Note that it's hardcoded to port 7545, the ability to update the port (and / or pull it from config coming shortly).

![screenshot](assets/screenshot.png)

## Installation

Begin by adding to your Truffle project via the following:

```
npm i truffle-plugin-debugger
```

Add the following to your `truffle-config.json`:

```
plugins: [
  "truffle-plugin-debugger"
]
```

## Usage

To run the plugin, simple run the following command from the root of your Truffle project:

```
truffle run debug <command>
```

The list available commands is currently as follows:

- [start](#start)

<a name="start"></a>
### `Start`

The following starts the debugger...

```
truffle run debug start
```

If all goes well you should see the following output...

```
Starting Visual Debugger...
Started and listening at http://localhost:54321
```

## TODO

- [x] Transactions screen
- [x] Dynamically retrieve the artifacts (via Truffle DB)
- [ ] Implement the settings screen (Ganache instance config, Infura settings, etc)
- [ ] Fetch external (where do the contracts live)
- [ ] Tidy up the README
- [x] Bundle
- [ ] L2 support 🎉