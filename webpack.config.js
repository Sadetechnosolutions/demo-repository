const path = require('path');

module.exports = {
  // Other configuration settings...

  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/")
    }
  },
  
  // Other configuration settings...
};
