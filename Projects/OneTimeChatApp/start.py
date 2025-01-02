import sys
import webbrowser
import subprocess

print("Welcome in OneTimeChatApp.\nBy Kubajava0.")
choice = input("Enter \"H\" to host a server on your computer for temporary chat.\n"
               "Enter \"J\" to join already hosted server by another person.\n"
               "Enter \"C\" to close this app.\n"
               "Choice: ")

if choice.upper() == "H":
    path = input("Enter absolute path for the Node.js server you installed (e.g., C:\\Program Files\\nodejs\\node.exe): ")
    print("Starting a local server...")
    try:
        subprocess.run([path, ".\\server.js", ])
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
    webbrowser.open_new(".\html_files\\join_a_chat.html") 
    sys.exit(0)
elif choice.upper() == "C":
    print("Closing the app.")
    sys.exit(0)
else:
    print("Invalid choice. Please enter \"H\", \"J\", \"C\".")
