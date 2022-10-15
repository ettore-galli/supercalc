# SUPERCALC

## Create react app
```shell
npx create-react-app esempio --template typescript
```

## Setup firebase

### Create firebase project
[TBD]

### Doc link collection

```
Console firebase

https://console.firebase.google.com/

Quickstart

https://firebase.google.com/docs/hosting/quickstart

Install firebase-cli

https://firebase.google.com/docs/cli#install-cli-mac-linux

```

### Setup for deploy

1. Install firebase (CLI)
```shell 
npm install -D firebase-tools
npm audit fix
npm audit fix --force
```

2. Firebase init
```shell
firebase init hosting

Options used:

ettoregalli@MacBookProEttore supercalc % firebase init hosting  

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /Users/ettoregalli/Documents/SVILUPPO/pwa/supercalc/supercalc


=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: supercalc-ettore-galli (supercalc)
i  Using project supercalc-ettore-galli (supercalc)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
✔  Wrote build/404.html
? File build/index.html already exists. Overwrite? Yes
✔  Wrote build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!

```

### Build and deploy on firebase

```shell
npm run build

firebase deploy --only hosting

``` 

### App production URL
https://supercalc-ettore-galli.web.app