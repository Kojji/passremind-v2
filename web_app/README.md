# PassRemind - web app

This folder holds the PassRemind web app, made with VueJs, Tailwind and Firebase. This app is a password manager intended to be used in a small scale environment (small user pool). To deploy this app for personal use, you can follow the instructions on this document, or refer to this [guide](https://kojji.github.io/passremind-v2/).

## Requirements

- You must have node and npm installed
- Install Firebase CLI

```
npm -g firebase-tools
```

- You must have a Firebase account or create one
- Create a Firebase project

## App Setup

- clone repo

```
git clone
```

- update .env
- update functions/.env
- npm build
- firebase deploy

- Create a Firebase Project
- Configure Files
  Edit Global.js.example(/extension) and firebaseConfig.js.example(/extension and /webapp)
  Where Global.js will have a seed to generate the cryptograph key
  firebaseConfig.js stores your firebase project setup data
  then take out ".example"

You must have node and npm installed, first run the general setup, then choose if you rather set only the web app or both, the web app and plugin

general setup

```
npm install -g @vue/cli

```

plugin setup

```
cd extension
npm install
npm run build
```

\*after you build the extension, create a "passRemind.zip", with the "dist" folder and place it where "webapp/public/passRemind.zip.example" is, otherwise it won't be possible to download the plugin from the webapp

web app

```
cd webapp
npm install
npm build
```

### deploy

To deploy the web app run

```
firebase deploy
```

it will deploy you app on the URL indicated by firebase, under the creation of the project

To deploy the plugin, the "extension/dist" folder must be uploaded following the link,
https://developer.chrome.com/extensions/getstarted#manifest under the "Create the Manifest" will teach you how to load you plugin
