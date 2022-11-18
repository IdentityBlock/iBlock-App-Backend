var express = require('express');
var router = express.Router();
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json({
    'response': 'ok'
  });
});

router.get('/logo.png', function(req, res){
  return res.sendFile(path.join(__dirname, '../mail_templates/images/iblock.png'));
});

module.exports = router;
