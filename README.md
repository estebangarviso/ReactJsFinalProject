![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/estebangarviso/ReactJsFinalProject)
![Lines of code](https://img.shields.io/tokei/lines/github/estebangarviso/ReactJsFinalProject)

# ReactJS Final Project 🚀

This is the 3nd course that belongs to the Escalab Academy's FULL STACK DEVELOPER NINJA MASTER ROUTE 3 (2021's 2nd Gen).<br />
Here my progress in the course like tasks and related projects is stored.

## [GITHUB Project](https://github.com/users/estebangarviso/projects/3)

## Code Explaining

**Archtecture and Design Patterns**
This ReactJS app is implemented with Redux so it use Flux Arquitecture and Design Patterns (the same one that facebook use to build their apps). Also use Container-Layout and Style Component Design.

**Technologies**

- ReactJS, obviously, in order to create a reactive app
- Webpack as main compiler with splitted config for development and production
- Typescript for type-checking during compile time when code is been compiled to JS
- BabelJS to convert ES7+ code into a backwards compatible version of JS in current and older browsers or environments.
- Bootstrap SCSS and SCSS Theming for styling the app
- Material UI Icons

## Install 🔧

### First create environment variables

#### Go to https://www.google.com/recaptcha

1. Click Admin Console.
2. Enter a label for your ReCaptcha and select the V2 checkbox.
3. Add the URL for your site in the Domain section.
4. Accept the terms of service and click Submit. Copy the Site Key and Secret Key that Google generates.
5. Copy and paste recaptcha site key in .env files

#### Go to https://formspark.io/

And sign up and follow the steps:

1. Create a form
2. Go to setting and update recaptcha v2 secret key
3. Copy and paste formspark url in .env files

#### Go to https://testnet.binance.vision/

1. Log in with Github
2. Generate HMAC_SHA256 Key
3. Copy and paste Api Key and Secret Key in .env

#### Development (.env)

Rename .env.example to .env

```env
# Firebase API KEY
FIREBASE_API_KEY=XXX
# Protocol and Domain
PUBLIC_URL=http://localhost:3000
# Formspark URL
FORMSPARK_URL=https://submit-form.com/XXX
# Recaptcha 2 Site Key
RECAPTCHA_SITE_KEY=XXX
# Recaptcha 2 Secret
RECAPTCHA_SECRET=XXX
# Binance Testnet API Key
BINANCE_TESTNET_API_KEY=XXX
# Binance Testnet Secret Key
BINANCE_TESTNET_SECRET_KEY=XXX
```

#### Production (.env.prod)

1. Rename .env.prod.example to .env.prod

```env
# Firebase API KEY
FIREBASE_API_KEY=XXX
# Protocol and Domain
PUBLIC_URL=https://wololo.vercel.app
# Formspark URL
FORMSPARK_URL=https://submit-form.com/XXX
# Recaptcha 2 Site Key
RECAPTCHA_SITE_KEY=XXX
# Recaptcha 2 Secret
RECAPTCHA_SECRET=XXX
# Binance Testnet API Key
BINANCE_TESTNET_API_KEY=XXX
# Binance Testnet Secret Key
BINANCE_TESTNET_SECRET_KEY=XXX
```

**From terminal**

- Download and install [GIT](https://git-scm.com/downloads).
- Download and install [Node](https://nodejs.dev/download).
- Install yarn (optional)

```sh
npm i -g yarn
```

- Open CMD or BASH terminal and type and press enter each line of command (Server runs on development mode).

```sh
cd <YOUR_PATH>
git clone --branch main https://github.com/estebangarviso/ReactJsFinalProject
```

### Up development server for testing

Yarn

```sh
yarn install
yarn run dev-server

OR

npm install
npm run dev-server
```

### Upload project to Vercel from machine for production test

#### Go to [Vercel CLI](https://vercel.com/cli)

### Install from terminal

```sh
yarn global add vercel

OR

npm i -g vercel
```

1.  Localice your clone project direcetory and run the next commands

```sh
vercel
#? Follow anthentication steps...
#? Set up and deploy "<PROJECT_DIRECTORY>"? [Y/n]
Y
#? Which scope do you want tp deploy to?
<SELECT_YOUR_GIT_USER>
#? Link to existing project? [y/N]
N
#? What's your project's name?
<WRITE_THE_NAME_OF_YOUR_PROJECT>
#? In which directory is your code located?
./
#? Want to override the settings? [y/N]
N
#? Wait the deploy error...
```

3.  Go to your [Vercel Dashboard](https://vercel.com/dashboard)
4.  Select the project and override scripts from **Project settings > General > Build & Development Settings**:

- Build Command: webpack --config webpack.prod.ts
- Output Directory: public
- Install command: yarn install
- Development: react-scripts start

### Install from Vercel Control Panel

1.  Upload clone to your repository on github
2.  Import project from this repository on vercel dashboard clicking on **New Project**
3.  Select the project and override scripts from **Project settings > General > Build & Development Settings**:

- Build Command: webpack --config webpack.prod.ts
- Output Directory: public
- Install command: yarn install
- Development: react-scripts start

### Package Scripts 🛠️

Run a webpack server in development mode with eval sourceMap and save bundle in memory

```sh
yarn run dev-server

OR

npm run dev-server
```

Run a webpack server in development mode with eval sourceMap and save bundle in public folder

```sh
yarn start

OR

npm start
```

Run a webpack server in production mode with sourceMap

```sh
yarn run build

OR

npm run build
```

- Development uses port 3000.
- Visit base url [http://localhost:3000](http://localhost:3000) for development.
- Rememver if you want to upload this project to server, modify .env or .env.prod file with your server domain before running these scripts.

### Status 📖

![GitHub branch checks state](https://img.shields.io/github/checks-status/estebangarviso/ReactJsFinalProject/main?style=solid)

### Skills Learned and Applied 🛠️

![React 17 & Legacy](https://img.shields.io/badge/React%2017%20%26%20Legacy--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=React)
![Redux](https://img.shields.io/badge/Redux--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=Redux)
![Webpack](https://img.shields.io/badge/Webpack--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=Webpack)
![Babel](https://img.shields.io/badge/Babel--F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=Babel)

### Contributions 🖇️

Pull requests are welcome. For important changes, open an issue first to discuss what you would like to change.

Be sure to update the tests accordingly.
