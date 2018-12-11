# Metada

The browser (Chrome & Firefox) extension which shows you who owns the Media.

For now, France only. Help wanted for more countries (front/back devs). 

**Join us on our [Discord discussion <img src="https://avatars3.githubusercontent.com/u/1965106?s=200&v=4" width=15 height=15/>](https://bit.ly/metadaDiscord)!** 

A glimpse at the upcoming version? :

![Imgur](https://i.imgur.com/0znkY0Y.gif)

([`dev` branch](https://github.com/vict0rsch/metada/tree/dev))

---

1. [**Contributing**](https://github.com/vict0rsch/metada#contributing)
2. [**Vision**](https://github.com/vict0rsch/metada#vision)
3. [**How to install**](https://github.com/vict0rsch/metada#how-to-install---regular-user)

    a. [**Official Chrome and Firefox Stores**](https://github.com/vict0rsch/metada#official-stores)

    b. [**From this source**]()

4. [**Setting things up: Front-End dev**](https://github.com/vict0rsch/metada#how-to-install---front-end-dev)
5. [**About Metada**](https://github.com/vict0rsch/metada#metada-1)
6. [**Data**](https://github.com/vict0rsch/metada#data)

## Contributing

**Checkout [contribute.md](/contribute.md)**, don't be afraid to add a line (beginners can check this: [first-contributions](https://github.com/firstcontributions/first-contributions))

All help is welcome. To modify information about the graph, submit a pull request to https://github.com/mdiplo/Medias_francais or open an issue here.

**Journalists** your help is welcome about the project's guidance and its spread.

**Developpers** your help is MOST welcome to make the extension the best version of itself. 

## Vision

The core value of Metada is to bring users pieces of information about the media they read. Owenrship is only one of them: let's include public subsidies, number of journalists, audience etc.

The core vision of Metada is to bring users data about their online behaviour. Not only about the media (other websites can be owned), not only about ownership (who is the journalist you read? his background, previous media etc.)

## How to install - Regular User

### Official stores

[**Chrome Web Store**](https://bit.ly/metadaChrome)

[**Firefox Web Store**](https://bit.ly/metadaFirefox)

### From this source

1. Click the green "Clone or download" button then "Download ZIP"
2. Extract the ZIP file wherever you like
3. In Chrome, go to Extensions : `chrome://extensions/` (you can type this in the address bar)
4. Allow the "Developper Mode" by clicking on the checkbox (top right)
5. Click on "Load unpacked extension" and, within the folder where you unzipped the file in 2. select the `Extension` folder.
**DONE!**
At Chrome start up it may ask you whether or not to load this extension. Say yes if you do ;) 

## How to install - Front End Dev

1. Clone the project `git clone https://github.com/Vict0rSch/metada.git`
2. Go to `react/`: `cd ./metada/react/`
3. run `npm install` (or `yarn`)
4. run `npm start` (or `yarn`) to **start the dev server** and hot-reloading of React Components
	* That's it! The server runs on port `3000` so go to `http://localhost:3000/

6. To **build** the **extension** run `yarn extension` which will build the app and update the content of `metada/Extension` accordingly

### V1 on the way

To see the 2nd version currently under development, clone the repo and checkout the `dev` branch


## Metada

#### Why
**Who owns the media we're reading?** Most of the time we don't know. Not that the information is secret, we just don't necessarily think about it.

**Does it make any difference on the content?** Maybe. Sometimes. Often. Always. Depends, really. On the media, the owner, the piece of news, the time, location and country. Knowing who owns the media we're reading is a valuable information in itself. Not that it's a good or bad thing that they're owned, we just ought to think critically about it and sometimes link this with the potential groups' other activities, in other industries.

#### What

This Extension shows the the graph of ownership of the meadia you're reading. On a media it knows about, the **Metada** Extension will notify you, and if you click on it it will reveal the tree of ownership : from the end owner (individual as Murdoch or company as a Bank) to the media itself through intermediary companies. You can also wonder in the graph and find out about the other media these companies own. 


#### How

Metada is, obviously, an open-source project. The goal is to build a collaborative plateform for us to aggregate knowledge, source it (of course!) and add it to the CE so that it knows more and more, so that we can share, check and improve our understanding of the news. As we keep it simple and collaborative, we'll be able to put information sources in more perspective. 

#### Who

If you want to get involved, get in touch with me. This project is just starting, everything is to build, including the community. Especially if you have experience in Open Source Project management.

#### Current State

As of now, only the French Media are supported and the information is based on [this](https://www.monde-diplomatique.fr/cartes/PPA) work by *Le Monde Diplomatique*. It is but a prototype, not even an MVP and the database is static, included as a json-serialized file instead of the future server which is needed. I hope it changes soon!

## Data

The data is extracted from the map and a binding to https://github.com/mdiplo/Medias_francais is on the way. Additional data such as Wikipedia articles and websites are manually added. 

The data is hosted in a PostgreSQL database (see the Backend repo) on heroku. The raw data is publicly available at https://oop-pro.herokuapp.com/public/data
