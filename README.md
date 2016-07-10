# Angular 2 RC+ Websockets with Node, RxJs and Smoothie

A really sample app to play around with using Node to stream a sine wave
to a service in Angular 2 with WebSockets.

To set up:

```bash
# if you haven't yet, do this:
npm install -g angular-cli
npm install -g nodemon

# if you have it, to get RC1 do this:
npm update -g angular-cli

git clone git@github.com:krimple/angular2-websocket-plotter.git
cd angular2-websocket-plotter
npm install
```

To run:

```bash
# in one window, run:
ng server

# in another window, run:
nodemon src/server.js

# in browser, hit up http://localhost:3000
```

Enjoy!

Ken
