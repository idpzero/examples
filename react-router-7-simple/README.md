# React Router 7 + Remix Auth + IDPZero

Example implementation of a skeleton React Router 7 implementation with OAuth2 authentication via idpzero.

## Start idpzero

Within this folder start `idpzero` in a separate shell / console which will auto detect and load the configuration within the `.idpzero` directory.

```bash
idpzero serve
```

The idpzero dashboard will be available at `http://localhost:4379/`

See [Getting Started](https://idpzero.dev/guide/getting-started.html) if you need to install idpzero.

## Start the app

Install the dependencies:

```bash
npm install
```

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.