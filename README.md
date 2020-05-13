### Frameless news reader

#### What is it?
This is a basic slider for desktop that pulls from a news feed. The whole "gimmick" about it is this frameless aesthetic I had envisioned. Will see if it actually looks/works as I imagined.

#### Requirements
Note: this uses News API so you will need your own API key but it's free for personal use and this app has a forced attribute at the bottom.

#### Build process
The main thing to get is that the `reactjs` app is built using `npm run build` and then the Electron part is automatic, the `main.js` file pulls in the `index.html` file from the `reactjs` build. So all you have to do is, run the `reactjs` build first, then run the Electron packager second. Then you'll have your build folder in your specified OS with the `.exe` file. There are other steps to do an actual release where you can install the app by a single file. It's called `Electron Builder`. I have not done that myself so I don't know how that works at this time.