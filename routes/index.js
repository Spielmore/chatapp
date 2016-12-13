var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ChatApp' });
});

/* GET chat page. */
router.get('/chatPage', function(req, res, next) {
  res.render('chatPage', { title: 'ChatApp' });
});

router.post('/api/CustInit', function(req, res, next) {
	if(req.body.custName){
		res.render('chatPage', { title: 'ChatApp', name: req.body.custName, role: "customer" });
	} else {
		res.send("Failed to render Chat Page");
	}

});

/* Render chat page. */
router.post('/api/RepInit', function(req, res, next) {
	if(req.body.repName){
		res.render('chatPage', { title: 'ChatApp', name: req.body.repName, role:"rep" });
	} else {
		res.send("Failed to render Chat Page");
	}

  });


module.exports = router;
