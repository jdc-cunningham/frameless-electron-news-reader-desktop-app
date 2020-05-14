### Frameless news reader

#### What is it?
This is a basic slider for desktop that pulls from a news feed. The whole "gimmick" about it is this frameless aesthetic I had envisioned. Will see if it actually looks/works as I imagined.

#### Requirements
Note: this uses News API so you will need your own API key but it's free for personal use and this app has a forced attribute at the bottom.

#### Build process
The main thing to get is that the `reactjs` app is built using `npm run build` and then the Electron part is automatic, the `main.js` file pulls in the `index.html` file from the `reactjs` build. So all you have to do is, run the `reactjs` build first, then run the Electron packager second. Then you'll have your build folder in your specified OS with the `.exe` file. There are other steps to do an actual release where you can install the app by a single file. It's called `Electron Builder`. I have not done that myself so I don't know how that works at this time.

#### Limitations
**Transparent windows are not resizeable.** [Electron docs](https://www.electronjs.org/docs/api/frameless-window#limitations)
I thought I should point this out, this is fine for me. I'll briefly investigate if you can set specific size breakpoints and then toggle them, but not a big priority for me after I settle on a basic design. As an aside/FYI. I use a huge 34" curved monitor for my desk so this app is sized for that.

Also I personally do not intend to use this much, just a "starting my day" thing. I'm aiming to build it with a self-refresh but it's not going to do a lot of requests only top headlines. You can configure it yourself what you want it to do, but keep the 500 query/day limit in mind.

#### Attributes
As mentioned this is using [NewsAPI](https://newsapi.org). I also pulled icons from [uxwing](https://uxwing.com/)