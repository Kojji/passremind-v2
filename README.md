# PassRemind - web app

This folder holds the PassRemind web app, made with VueJs, Tailwind and Firebase. This app is a password manager intended to be used in a small scale environment (small user pool). To deploy this app for personal use, you can follow the instructions on this document.

## Requirements

- You must have node and npm installed
- Install Firebase CLI

```
npm -g firebase-tools
```

- You must have a Firebase account or create one
- Create a Firebase project

## App Setup

- Clone repo

```
git clone https://github.com/Kojji/passremind-v2.git
cd passremind-v2/
npm i
cd functions/
npm i
```

Remove the '.example' out of the '.env.example', do the same for functions/.env.example, then go to the Firebase project settings, and

- update the .env file and the functions/.env file with the project info and a new SALT string
- npm build
- firebase deploy

it will deploy you app on the URL indicated by firebase, under the creation of the project
