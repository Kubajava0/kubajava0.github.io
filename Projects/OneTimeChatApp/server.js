const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const WebSocket = require("ws");
const xss = require("xss-clean");

const hostname = "0.0.0.0";
const port = 3000;
const messages = [];
WebSocket.users = [];

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === "/chat") {
        response.setHeader("Content-Type", "text/html");
        fs.readFile(path.join(baseDir, "html_files", "chat.html"), function(error, data) {
            if (error) {
                response.writeHead(404);
                response.write("404 File Not Found");
            }
            else {
                response.writeHead(200);
                response.write(data);
            }
            response.end();
        });
    }
    else if (pathname === "/admin") {
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        response.end();
    }
    else {
        const filePath = path.join(__dirname, request.url);
        const extname = path.extname(filePath);

        const mimeTypes = {
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".html": "text/html"
        };
        const contentType = mimeTypes[extname] || "application/octet-stream";
        
        fs.readFile(filePath, (error, data) => {
            if (error) {
                response.writeHead(404);
                response.write("404 File Not Found");
            }
            else {
                response.writeHead(200, { "Content-Type": contentType });
                response.write(data);
            }
            response.end();
        });
    }
});

const wss = new WebSocket.Server({server});
wss.on("connection", (ws, req) => {
    console.log("New client connected:", req.socket.remoteAddress);
    ws.send(JSON.stringify({ type: "init", messages }));
    ws.username = "User";

    ws.on("message", (data) => {
        const message = xss(data.toString());
        if (message.startsWith("setUsername:")) {
            const newUsername = message.split(':')[1];
            ws.username = newUsername;

            if (WebSocket.users.includes(ws.username)) {
                ws.send(JSON.stringify({ type: "error" }));;
            }
            else {
                WebSocket.users.push(ws.username);
            }
        }
        else {
            messages.push(message);

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "message", message }));
                }
            });
        }
    });
    ws.on("close", () => {
        console.log("Client disconnected:", req.socket.remoteAddress);
    });
});

server.listen(port, hostname, () => {
    console.log(`Listening on ${hostname}:${port}`);
});
