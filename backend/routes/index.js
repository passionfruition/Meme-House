const express = require('express');
const router = express.Router();

router.get('/memes', (req, res, next) => {
    res.status(200).json({
        message: "Teeeest"
    })
    // db.Meme.find({})
    //     .then(function (result) {
    //         res.json(result);
    //     })
    //     .catch(function (error) {
    //         res.json(error);
    //     })
});

  
  router.get('/test', function(req, res, next) {
    res.send('<h1>hello</h1>');
  })

  module.exports = router;