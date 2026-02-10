const os = require("os");
const checkDiskSpace = require("check-disk-space").default;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function retreiveDataCPU(cpus) {
    let total = 0;
    let idle = 0;

    cpus.forEach((element) => {
        total += element.times.idle + element.times.irq + element.times.nice + element.times.sys + element.times.user;
        idle += element.times.idle;
    })

    return { total, idle };
}

function getSystemName() {
    return os.hostname();
}

// As a string
function getSystemUptime() {
    const uptime = os.uptime();

    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24))/3600);
    const mins = Math.floor((uptime % 3600) / 60)

    return `${days}d ${hours}h ${mins}min`;
}


async function getUsageCPU() {
    try {
        let data1 = retreiveDataCPU(os.cpus());
        let t1 = data1.total;
        let i1 = data1.idle;
    
        await sleep(1000);
    
        let data2 = retreiveDataCPU(os.cpus());
        let t2 = data2.total;
        let i2 = data2.idle;
    
        let delta_total = t2 - t1;
        let delta_idle = i2 - i1;
    
    
        return ((delta_total - delta_idle)/delta_total) * 100;
    } catch (error) {
        console.error("Error reading CPU usage: ", error);
        return null;
    }
}

function getUsageRAM() {
    try {
        const total_mem = os.totalmem();
        const free_mem = os.freemem();
    
        return ((total_mem - free_mem)/total_mem) * 100;
    } catch (error) {
        console.error("Error reading RAM usage: ", error);
        return null;
    }
}

async function getUsageDisk() {
    try {
        const diskPath = process.platform === "win32" ? "C:" : "/";
        const disk = await checkDiskSpace(diskPath);

        const total = disk.size;
        const free = disk.free;
        const used = total - free;

        return (used/total) * 100;
    } catch (error) {
        console.error("Error readind disk: ", error);
        return null;
    }
}

function getLocalIP() {
    const interfaces = os.networkInterfaces();

    for  (const name in interfaces) {
        for  (const net of interfaces[name]) {
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }

    return "IP not found";
}

module.exports = {
    getSystemName,
    getSystemUptime,
    getUsageCPU,
    getUsageRAM,
    getUsageDisk,
    getLocalIP
}