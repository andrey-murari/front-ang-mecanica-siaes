# front-ang-mecanica-siaes

Angular app that calls a configurable HTTP endpoint and shows the JSON response.

## Configure

Edit the default URL in `src/app/api.config.ts`. You can also type another URL on the page before fetching.

The browser calls the URL directly, so the API must allow cross-origin requests from this app.

## Run

```bash
npm start
```

Open http://localhost:4200.
