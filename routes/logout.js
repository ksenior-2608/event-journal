const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  req.flash("success", "You are logged out");
  req.logout();
  res.redirect("/login");
});

module.exports = router;
