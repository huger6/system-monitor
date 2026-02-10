const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Dashboard",
        activePage: "dashboard",
        css_block: '<link rel="stylesheet" href="/css/dashboard.css">'
    });
});

module.exports = router;