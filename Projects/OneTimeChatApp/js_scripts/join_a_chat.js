document.getElementById("form").addEventListener("submit", function(event) {
event.preventDefault(); 
const username = document.getElementById("username").value;
const ip = document.getElementById("ip").value;
const port = document.getElementById("port").value;
joinProcess(username, ip, port)
});

function joinProcess(username, ip, port) {
    if (correctData(username, ip, port) == true) {
        const url = `http://${ip}:${port}/chat.html?username=${username}&pass=0`;
        window.open(url);
    }
}
function correctData(username, ip, port) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const portRegex = /^[0-9]+$/;

    if (!username.trim()) {
        alert("Username cannot be empty.");
        return false;
    }
    if (!ipRegex.test(ip)) {
        alert("Invalid IP address format.");
        return false;
    }
    if (!portRegex.test(port) || port < 1 || port > 65535) {
        alert("Invalid port number. Must be between 1 and 65535.");
        return false;
    }

    return true;
}
