## Installation
```bash
# Install nodejs here: https://nodejs.org/en/download/ or
sudo apt-get install -y nodejs  # linux

# Install cordova
npm install -g cordova

# Create cordova project
# cordova create <project_dir_name> <project_address> <project_display_name>
cordova create hello com.example.hello HelloWorld

# Replace www directory with one provided with this repo

# Add platforms
cordova platform add android

# Add camera preview plugin
cordova plugin add cordova-plugin-camera-preview
# Add StatusBar plugin
cordova plugin add cordova-plugin-statusbar
```

## Usage
- Build & run app on mobile device/emulator:
  cordova run <platform_name>
- Serve app on a local server:
  phonegap serve
