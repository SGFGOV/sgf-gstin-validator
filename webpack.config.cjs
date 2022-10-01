const path = require('path');

module.exports = {
  resolve: {
    modules:[],
    fallback:
    {
    "util": false ,
    "buffer": false ,
    "stream-browserify": false,
    "jsonwebtoken":false
    }
  },
  entry: './dist/index.js',
  mode: "development",
  output: {
    filename: 'sgf-gstin-validator.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    fs: 
      {     
    }
    
  },
  
  
};
