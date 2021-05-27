# Truffle Visual Debugger

Debug all the things!

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

To run the plugin, simply run the following command from the root of your project:

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

Open the [link](http://localhost:54321) and off you go!

## Support

Support for this plugin is available via the Truffle community available [here](https://www.trufflesuite.com/community).