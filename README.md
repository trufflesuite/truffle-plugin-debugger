# Truffle Debugger

Debug all the things!

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

- [debug](#debug)

<a name="upload"></a>
### `Start`

```
truffle run debug
```

## TODO

- [x] Transactions screen
- [ ] Dynamically retrieve the artifacts (via Truffle DB)
- [ ] Implement the settings screen (Ganache instance config, Infura settings, etc)
- [ ] Tidy up the README
- [ ] Bundle
- [ ] L2 support 🎉