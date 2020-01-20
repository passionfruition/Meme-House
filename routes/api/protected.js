const router = require("express").Router();

// Matches with "/api/protected"
router.route("/")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            return res.json({ message: "Welcome to Meme House" });
        }
        res.sendStatus(401); //you are not allowed!
    });

module.exports = router;