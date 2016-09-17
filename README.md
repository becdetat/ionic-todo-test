# Ionic Todo test app

This is the todo app detailed in the Ionic Guide (http://ionicframework.com/docs/guide) but with ES6 and hopefully other refinements.

## Building in development

Open two consoles. In one:

	gulp watch

This will do the ES6 build whenever a file changes. The ES6 source is in `www/es6` and the files get transpiled and concatenated into `www/js/app.js`.

In the other console:

	ionic serve

This watches the source as well, and serves the app at http://localhost:8100.
