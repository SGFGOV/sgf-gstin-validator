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
  entry: './src/index.js',
  mode: "production",
  output: {
    filename: 'gstin-validator.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    fs: 
      {     
    }
    
  },
  
  
};
