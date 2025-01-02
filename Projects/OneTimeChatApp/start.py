import os
import sys
import webbrowser
import subprocess

script_dir = os.path.dirname(os.path.abspath(__file__))
print("Welcome in OneTimeChatApp.\nBy Kubajava0.")
choice = input("Enter \"H\" to host a server on your computer for temporary chat.\n"
               "Enter \"J\" to join already hosted server by another person.\n"
               "Enter \"C\" to close this app.\n"
               "Choice: ")

if choice.upper() == "H":
    path = input("Enter absolute path for the Node.js server you installed (e.g., C:\\Program Files\\nodejs\\node.exe): ")
    print("Starting a local server...")
    try:
        server_file = os.path.join(script_dir, "server.js")
        subprocess.run([path, server_file])
    except FileExistsError:
        print(f"The file {path} or server.js was not found.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print(f"Error: {e}")
    sys.exit(0)
elif choice.upper() == "J":
    print("Opening a local page to enter credentials...")
    join_page = os.path.join(script_dir, "html_files", "join_a_chat.html")
    webbrowser.open_new(join_page)
    sys.exit(0)
elif choice.upper() == "C":
    print("Closing the app.")
    sys.exit(0)
else:
    print("Invalid choice. Please enter \"H\", \"J\", \"C\".")
