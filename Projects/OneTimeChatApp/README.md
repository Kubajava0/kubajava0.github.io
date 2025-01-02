### **Important:** In this version this server runs on the **http** protocol, meaning the connection is **NOT encrypted**. Additionally, the default hostname is 0.0.0.0, so after you enable the port on firewall and set-up a port forwarding, your chat will become accessible from any device worldwide, thus make sure to **NEVER send any sensitive or confidential information over this connection**, as it could be intercepted by unauthorized users or third parties due to the lack of encryption. In future updates I may increase the security of the chat, but for now just use it for fun, not really seriously.
### P.S. This version uses **xss-clean** to avoid xss. Also run `npm audit` sometimes to keep your packages(fs, url, ws,...) up-to-date, otherwise there could be some abusable bug.


### There are also some incoming updates (this is not the final version) - adding /admin, encrypting connection, etc.
### In this folder is `OneTimeChatApp.zip`, which contains all the necessary scripts.

# How to use this program in short:

### HOSTING REQUIRED (ADVANCED):

**0. Install Node.js and modules**:  
   - [Download Node.js](https://nodejs.org) — This is the server required for hosting the chat.
   - Run `npm install http fs path url ws xss-clean` (Nmp is default package manager for Node.js.) in the directory `OneTimeChatApp` (or how you renamed it).

**1. Check Your Firewall Settings**:  
   - Ensure that the port your Node.js server is using (e.g., 3000) is open in your firewall.  
   - If you're running this on a cloud server (e.g., AWS, Google Cloud, etc.), update the security group to allow traffic on port 3000 (or any port you use).  
   - Here's how to open the port on a local desktop computer:  
     - **Linux UFW (Uncomplicated Firewall)**:  
       ```bash
       sudo ufw allow 3000  # Or any port you use
       ```
     - **Windows**:  
       Open Windows Defender Firewall settings. Add an inbound rule to allow traffic on port 3000 (or any port you use).

**2. Configure Your Router (Port Forwarding)**:  
   - If your server is behind a router, you need to configure port forwarding:  
     - Log in to your router's admin interface (usually at `192.168.x.x`), and look for Port Forwarding settings.  
     - Forward port 3000 (or your server's port) to the local IP address of your machine running the Node.js server.
       - To find the local IP address:
         - **On Windows**: Run `ipconfig` in the command prompt.
         - **On Linux**: Run `ifconfig` in the terminal.
         - Look for the interface in use:  
            - `eth0` for Ethernet.
            - `wlan0` for Wi-Fi.
         - Check the **IPv4 Address** field.

---

### JOINING REQUIRED:

- Keep in mind that there are two possible arguments in the URL (the IP of the server with the correct port):  

  **1. Required "pass" argument**:  
     - If set to `0`, you will proceed to the chat. The argument’s default value is `1`. **If you don’t set it to "0", you will not proceed to the chat (you’ll get a 403 error)**.  
     - However, if you use the `join_a_chat.html` (accessed from `start.py` script) formula, it will automatically set the "pass" argument to `0`, so you don’t need to worry about it.  

  **2. Optional "username" argument**:  
     - This argument is fully optional and changes your name in the chat.  
     - If you use the chat without this argument, your username will be defaultly set to "User".  
    - **Important**: If a user with that name already exists, **you won’t proceed to the chat**, also with one username you can join only one time, so if you refresh the site or join later **you won’t proceed to the chat with the same username**.

---

#### In this guide for `start.py`, I assume that you may not have **Python** installed. While installing Python (and using the `start.py` script) is not strictly required, it is highly recommended and convenient, especially for beginners. If you decide to run `start.py`, you’ll need to [Download Python](https://www.python.org/) and follow the official documentation or another guide to complete the installation.

#### After reading all of the above, you can choose to either host your own server (after installing the necessary programs) or join an already hosted server (with necessary parameters).

- If you are advanced, you can read and understand the logic of the code, edit it for your specific purposes and run them with custom scripts.
- If you aren’t advanced, don’t worry! Just run the `start.py` script and follow the tasks in the terminal.

---

### If you have any problems, improvements or just questions contact me on my GitHub page **https://kubajava0.github.io/Kubajava0/** in the section **Contact** or write me an e-mail: **kubajava0@gmail.com**.
