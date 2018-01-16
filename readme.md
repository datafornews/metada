#### Regular User
Installation guide to use the (for now) unofficial Chrome Extension at the end of the page!

#### Devs
See install quick guide at the end of this Readme, check out the Wiki for more technical info

---

# Open Ownership Project - OOP

### Why
**Who owns the media we're reading?** Most of the time we don't know. Not that the information is secret, we just don't necessarily think about it.

**Does it make any difference on the content?** Maybe. Sometimes. Often. Always. Depends, really. On the media, the owner, the piece of news, the time, location and country. Knowing who owns the media we're reading is a valuable information in itself. Not that it's a good or bad thing that they're owned, we just ought to think critically about it and sometimes link this with the potential groups' other activities, in other industries.

### What

This Chrome extension (CE) shows the the graph of ownership of the meadia you're reading. On a media it knows about, the **OOP** CE will notify you, and if you click on it it will reveal the tree of ownership : from the end owner (individual as Murdoch or company as a Bank) to the media itself through intermediary companies. You can also wonder in the graph and find out about the other media these companies own. 

[![](https://s2.postimg.org/6byfb6hbt/Capture_d_e_cran_2017-08-06_a_16.03.40.png)](https://postimg.org/image/zecpe03lh/)

### How

The OOP is, obviously, an open-source project. The goal is to build a collaborative plateform for us to aggregate knowledge, source it (of course!) and add it to the CE so that it knows more and more, so that we can share, check and improve our understanding of the news. As we keep it simple and collaborative, we'll be able to put information sources in more perspective. 

### Who

If you want to get involved, get in touch with me. This project is just starting, everything is to build, including the community. Especially if you have experience in Open Source Project management.

### Current State

As of now, only the French Media are supported and the information is based on [this]() work by *Le Monde Diplomatique*. It is but a prototype, not even an MVP and the database is static, included as a json-serialized file instead of the future server which is needed. I hope it changes soon!

# How to install - Regular User

1. Click the green "Clone or download" button then "Download ZIP"
2. Extract the ZIP file wherever you like
3. In Chrome, go to Extensions : `chrome://extensions/` (you can type this in the address bar)
4. Allow the "Developper Mode" by clicking on the checkbox (top right)
5. Click on "Load unpacked extension" and, within the folder where you unzipped the file in 2. select the `Chrome Extension` folder.
**DONE!**
At Chrome start up it may ask you whether or not to load this extension. Say yes if you do ;) 

# How to install - Front End Dev

1. Clone the project `git clone https://github.com/Vict0rSch/oop.git`
2. Go to `react/`: `cd ./oop/react/`
3. run `npm install` (or `yarn`)
4. run `npm start` (or `yarn`) to start the dev server and hot-reloading of React Components
5. That's it! The server runs on port `3000` so go to `http://localhost:3000/`
