var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ChatApp' });
});

/* GET chat page. */
router.get('/chatPage', function(req, res, next) {
  console.log(req.body);
  res.render('chatPage', { title: 'ChatApp'});
}); 


router.post('/api/custInit', function(req, res, next) {
	if(req.body.custextinput){
		var name = req.body.custextinput;
		//res.set("Content-Type", "application/javascript");
		res.render('chatPage', {title: 'ChatApp', name: name, role: "customer"}); //title: 'ChatApp', name: req.body.custName, role: "customer"
	} else {
		res.send("Failed to render Chat Page");
	}

});

/* Render chat page. */
router.post('/api/repInit', function(req, res, next) {
	if(req.body.reptextinput){
		var name = req.body.reptextinput;
		res.render('chatPage', { title: 'ChatApp', name: name, role:"rep" });
	} else {
		res.send("Failed to render Chat Page");
	}

  });


module.exports = router;
