# redux-persist-expo-securestore

Storage engine for [redux-persist](https://github.com/rt2zz/redux-persist) for use with [Blockstack Gaia ](https://github.com/blockstack/gaia).

## Installation

Requires [Blockstack JS](https://github.com/blockstack/blockstack.js).

Yarn: `yarn add redux-persist-blockstack`

npm: `npm install --save redux-persist-blockstack`

## Usage

Use as a `redux-persist` global storage engine:

```js
import createBlockstackStore from "redux-persist-expo-blockstack";
import * as blockstack from "blockstack";

import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import reducers from "./reducers";

// Secure storage
const storage = createBlockstackStore(blockstack);
const config = {
    key: "root",
    storage
};

const reducer = persistCombineReducers(config, reducers);

function configureStore () {
  // ...
  let store = createStore(reducer);
  let persistor = persistStore(store);

  return { persistor, store };
}
```

Use as an engine for only a reducer:

```js
import createBlockstackStore from "redux-persist-blockstack";
import * as blockstack from "blockstack";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import { mainReducer, blockstackReducer } from "./reducers";

// Secure storage
const storage = createBlockstackStore(blockstack);
const blockstackPersistConfig = {
  key: "blockstack",
  storage
};

// Combine them together
const rootReducer = combineReducers({
  main: mainReducer,
  blockstack: persistReducer(blockstackPersistConfig, blockstackReducer)
});

function configureStore () {
  // ...
  let store = createStore(rootReducer);
  let persistor = persistStore(store);

  return { persistor, store };
}
```

## API

### `createBlockstackStore([blockstack], [options])`

#### `[blockstack]`: `instance`
#### `[options]`: `object`

### Options to pass to [Blockstack JS](http://blockstack.github.io/blockstack.js/index.html#getfile):

##### `decrypt`: `boolean` (default false)

Try to decrypt the data with the app private key

##### `username`: `string`

The Blockstack ID to lookup for multi-player storage

##### `app`: `string`

The app to lookup for multi-player storage - defaults to current origin

##### `zoneFileLookupURL`: `string` (default http://localhost:6270/v1/names/)

The Blockstack core endpoint URL to use for zonefile lookup

### Redux-persist-blockstack specific options:

##### `replacer`: `function(key: string): string`

Replacer used to determine file path.
Default: replace `persist:foo` with `foo.json`

```js
function defaultReplacer(key) {
  const removePersist = str => str.replace("persist:", "");
  return `${ removePersist(key) }.json`;
}
```


## Note

Inspired by [redux-persist-expo-securestore](https://github.com/Cretezy/redux-persist-expo-securestore)
