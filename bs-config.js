module.exports = {
    "port": 3000,
    "server": {
        "baseDir": "./public",
        "routes": {
            "/node_modules": "node_modules",
            "/app": "build",
            "/systemjs.config.js": "systemjs.config.js",
            "/css": "build_css"
        }
    },
    "browser": "chrome"
};
