 Ensemble
=========

## Project details

Ensemble is a social media website designed to connect users with similar musical interest, jam and form bands to play together. Users can create, delete, edit their own bands, apply for open spots in other bands and chat with different users.

## Features
- Users can create an account, edit their profile according to their interests in instruments and genres.

<p align="center">
  <img src="./client/docs/login-search.gif" alt="animated" />
</p>
<!-- ![](https://github.com/fbssaejun/ensemble/blob/master/client/docs/editprofile-createband.gif) -->

- Users can create, edit, delete their own band. They can specify specific open spots to accept applications from other users(players). Thet can also feature their bands, which will allow their bands to be displayed on the homepage.

![](https://github.com/fbssaejun/ensemble/blob/master/client/docs/edit-band.gif)

- Users can search all bands and users from the database, filter through the results with specific genre and instrument. They can also filter bands with availability of open position.

![](https://github.com/fbssaejun/ensemble/blob/master/client/docs/login-search.gif)

- Users can apply for bands that they are interested in, and band owners can either accept, or reject applications.
- Users can chat with different users. 

![](https://github.com/fbssaejun/ensemble/blob/master/client/docs/chat-applicationStatus.gif)

## Getting Started

1. Install dependencies: `npm i`
2. run `npm run start` on your host machine for client, `npm run go` for server. If you do not have PostgresSQL on your host machine, please download from https://www.postgresql.org/download/. 
3. Visit `http://localhost:3000/`
4. Start Jamming! 

## Dependencies

- React.js
- Node.js
- Express.js
- dotenv
- node-sass
- pg
- pg-native
- socket.io
- body-parser
- axios
- material-ui
- framer-motion
