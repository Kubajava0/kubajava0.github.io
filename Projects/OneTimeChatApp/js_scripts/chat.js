const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const username = GetURLParameter("username") || "User";
const pass = GetURLParameter("pass") || 1;

if (pass == 0) {pass;}
else {
    document.getElementById("chat-container").style.display = "none";
    document.getElementById("forbidden-message").style.display = "block";
    throw new Error("403 Forbidden");
}

const chatYourname = document.getElementById('chat-yourname');
if (chatYourname) {
    chatYourname.innerText = `Your name: ${username}`;
}

const ws = new WebSocket(`ws://${location.host}`);
ws.onopen = () => {
    ws.send(`setUsername:${username}`);
};
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "init" && Array.isArray(data.messages)) {
        data.messages.forEach((msg) => {
            if (typeof msg === "string") {
                try {
                    msg = JSON.parse(msg);
                } 
                catch (error) {
                    console.error(msg, error);
                    return;
                }
            }
            if (typeof msg === "object" && msg !== null && typeof msg.username === "string" && typeof msg.text === "string") {
                addMessage(msg.username, msg.text);
            } 
            else {
                console.error(msg);
            }
        });
    }
    else if (data.type === "message") {
        try {
            const message = JSON.parse(data.message);
            addMessage(message.username, message.text);
        } 
        catch (error) {
            console.error(data.message, error);
        }
    }
    else if (data.type === "error") {
        document.getElementById("chat-container").style.display = "none";
        document.getElementById("forbidden-message").style.display = "block";
        throw new Error("403 Forbidden");
    }
};

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        const message = { username, text: messageText };
        ws.send(JSON.stringify(message));
        messageInput.value = '';
    }
});
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

function formatMessageContent(text) {
    const urlRegex = /(https?:\/\/[^\s]+(\.jpg|\.png|\.gif|\.jpeg)?)|(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, (url) => {
        if (url.match(/\.(jpg|jpeg|png|gif)$/)) {
            return `<img src="${url}" alt="Image" class="message-image" />`;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}
function addMessage(user, text) {    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const formattedText = formatMessageContent(text);
    messageElement.innerHTML = `<div class="user">${user}</div><div class="text user-message">${formattedText}</div>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
