document.addEventListener("DOMContentLoaded",  () => {
    updateCPU();
    updateRAM();
    updateDisk();

    setInterval(updateCPU, 3000);
    setInterval(updateRAM, 1000);
    setInterval(updateDisk, 1000);
    setInterval(updateUptime, 60000);
});

async function updateCPU() {
    const cpu = document.getElementById("cpu-value");
    try {
        const response = await fetch("/cpu-usage", { 
            method: "GET",
            headers: {"Accept": "application/json"}
        })

        const data = await response.json();

        if (response.ok && data.success) {
            cpu.innerText = `${data.CPU_usage.toFixed(1)}`;
        } else {
            cpu.innerHTML = "--";
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateRAM() {
    const ram = document.getElementById("ram-value");
    try {
        const response = await fetch("/ram-usage", { 
            method: "GET",
            headers: {"Accept": "application/json"}
        })

        const data = await response.json();

        if (response.ok && data.success) {
            ram.innerText = `${data.RAM_usage.toFixed(1)}`;
        } else {
            ram.innerHTML = "--";
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateDisk() {
    const disk = document.getElementById("disk-value");
    try {
        const response = await fetch("/disk-usage", { 
            method: "GET",
            headers: {"Accept": "application/json"}
        })

        const data = await response.json();

        if (response.ok && data.success) {
            disk.innerText = `${data.Disk_usage.toFixed(1)}`;
        } else {
            disk.innerHTML = "--";
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateUptime() {
    const uptime = document.getElementById("uptime-value");
    try {
        const response = await fetch("/get-uptime", { 
            method: "GET",
            headers: {"Accept": "application/json"}
        })

        const data = await response.json();

        if (response.ok && data.success) {
            uptime.innerText = `${data.Uptime}`;
        } else {
            uptime.innerHTML = "--";
        }
    } catch (error) {
        console.log(error);
    }
}