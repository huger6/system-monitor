# System Monitor Dashboard

A simple but useful real-time system monitoring dashboard built with **Node.js**, **Express.js**, and **EJS**. The main goal of this project was to learn these technologies hands-on by building something practical rather than a throwaway tutorial app.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)

## About

This project was built as a learning exercise to get comfortable with:

- **Node.js** — server-side JavaScript, working with the `os` module and async patterns
- **Express.js** — routing, middleware, serving static files, and building REST-like API endpoints
- **EJS** — server-side templating with partials and dynamic data injection

The idea was to make something simple but actually useful: a dashboard that monitors your machine's vitals in real time, right from the browser.

## Features

- **CPU Usage** — live percentage updated every 3 seconds via API polling
- **RAM Usage** — real-time memory consumption
- **Disk Usage** — storage capacity for the primary drive
- **System Uptime** — formatted as days, hours, and minutes
- **Hostname & Local IP** — quick system identification
- Responsive sidebar layout using Bootstrap 5 and Bootstrap Icons
- Clean separation of concerns (routes, services, views, static assets)

## Project Structure

```
app/
├── server.js              # Entry point — starts the server on port 3000
├── app.js                 # Express app setup, middleware, and route mounting
├── routes/
│   ├── dashboard.js       # Dashboard page and JSON API endpoints
│   └── about.js           # About page route
├── services/
│   └── sys_info.js        # System info utilities (CPU, RAM, disk, network)
├── static/
│   ├── css/               # Stylesheets (global + page-specific)
│   └── js/                # Client-side JS for live metric updates
└── views/
    ├── index.ejs           # Dashboard view
    ├── about.ejs           # About view
    └── partials/
        ├── header.ejs      # Shared HTML head, navbar/sidebar
        └── footer.ejs      # Shared footer and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
git clone https://github.com/your-username/system-monitor.git
cd system-monitor/app
npm install
```

### Running

```bash
# Development (with auto-reload via nodemon)
npm run devStart

# Production
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Endpoint       | Method | Description                        |
| -------------- | ------ | ---------------------------------- |
| `/`            | GET    | Renders the dashboard page         |
| `/cpu-usage`   | GET    | Returns CPU usage as JSON          |
| `/ram-usage`   | GET    | Returns RAM usage as JSON          |
| `/disk-usage`  | GET    | Returns disk usage as JSON         |
| `/about`       | GET    | Renders the about page             |

## Dependencies

| Package                                                          | Purpose                        |
| ---------------------------------------------------------------- | ------------------------------ |
| [express](https://www.npmjs.com/package/express)                 | Web framework                  |
| [ejs](https://www.npmjs.com/package/ejs)                         | Templating engine              |
| [check-disk-space](https://www.npmjs.com/package/check-disk-space) | Cross-platform disk usage    |
| [nodemon](https://www.npmjs.com/package/nodemon) *(dev)*         | Auto-restart on file changes   |

## Known Limitations

The project is **finished** and fully functional, but there is room for improvement in how CPU usage is calculated. The current approach takes two snapshots of CPU times with a `sleep(1000)` (1-second delay) in between and computes the delta. While this works, the `sleep` call blocks the response for a full second on every request and can reduce accuracy under certain conditions. A better approach would be to continuously sample CPU times in the background and serve the latest computed value instantly when requested, avoiding the per-request delay altogether.

## License

This project is licensed under the GPL v3 License — see the [LICENSE](LICENSE) file for details.
