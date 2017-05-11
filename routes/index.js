var express = require('express');
var handler = require('../handlers/parser.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/find', function (req, res, next){
  var query = req.body.query;
  console.log('query', query);
  handler.parse(query, function(err, result){
    if (err)
      return res.status(500).send(err);
    return res.status(200).send(result);
  })
})

module.exports = router;
