const express = require("express");
const router = express.Router();

const {getSystemName, getSystemUptime, getUsageCPU, getUsageRAM, getUsageDisk, getLocalIP} = require("../services/sys_info");

router.get("/", (req, res) => {
    res.render("index", {
        title: "Dashboard",
        activePage: "dashboard",
        uptime_str: getSystemUptime(),
        system_name: getSystemName(),
        sys_ip: getLocalIP(),
        css_block: '<link rel="stylesheet" href="/css/dashboard.css">',
        js_block:  '<script src="/js/dashboard.js"></script>'
    });
});

router.get("/cpu-usage", async (req, res) => {
    try {
        const usage = await getUsageCPU();

        res.status(200).json({"success": true, "CPU_usage": usage });
    } catch(error) {
        res.status(500).json({"success": false, error: "Error calculating CPU Usage"});
    }
})

router.get("/ram-usage", (req, res) => {
    try {
        const usage = getUsageRAM();

        res.status(200).json({"success": true, "RAM_usage": usage });
    } catch(error) {
        res.status(500).json({"success": false, error: "Error calculating RAM Usage"});
    }
})

router.get("/disk-usage", async (req, res) => {
    try {
        const usage = await getUsageDisk();

        res.status(200).json({"success": true, "Disk_usage": usage });
    } catch(error) {
        res.status(500).json({"success": false, error: "Error calculating disk Usage"});
    }
})

router.get("/get-uptime", async (req, res) => {
    try {
        const up = await getSystemUptime();

        res.status(200).json({"success": true, "Uptime": up });
    } catch(error) {
        res.status(500).json({"success": false, error: "Error calculating system uptime"});
    }
})


module.exports = router;