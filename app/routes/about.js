const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("about", {
        title: "About Us",
        activePage: "about_us",
        css_block: '<link rel="stylesheet" href="/css/about.css">'
    });
});

module.exports = router;