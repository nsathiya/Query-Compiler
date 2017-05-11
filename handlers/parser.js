var Parser = require('../utilities/parser.js');

var parseHandler = function(str, cb){
  try {
    cb(null, Parser.parseString(str))
  } catch (err){
    //if error, return error
    cb(err);
  }
}

module.exports.parse = parseHandler;
