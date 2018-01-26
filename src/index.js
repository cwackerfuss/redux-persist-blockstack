export default function createBlockstackStorage(blockstack, options = null) {
  const replacer = options.replacer || defaultReplacer;

  return {
    getItem: key => (
      blockstack.getFile(replacer(key), options)
    ),
    setItem: (key, value) => (
      blockstack.putFile(replacer(key), value, options)
    )
  };
}

function defaultReplacer(key) {
  const removePersist = str => str.replace("persist:", "");
  return `${ removePersist(key) }.json`;
}
