Deployed: https://mtg-hub.herokuapp.com/

# MTG Trade Hub
# Project 3 - Interactive MERN SPA Project

## Description
MTG Trade Hub is an application used to track and maintain a user's collection for Magic: The Gathering cards. It also allows the user to interact with other users to set up trades for their cards through a posting system. Ideally the user can post a card or cards they are looking for and other users will then respond to that post with their own comments. By clicking on either the poster's username or one of the commenter's, the user can view the cards that the other users have added to their trade inventory.

## Contributors
<br>Ely Daley - https://github.com/3lyDaley
<br>Nic Carrig - https://github.com/NicCarrig
<br>Matthew Silver - https://github.com/silver-matt
<br>Siosaia Akau - https://github.com/magoofy

## Requirements
To run locally you will need:
    
    React
    Express.js
    Node.js
    MongoDB
    Apollo
    
    Root:
    concurrently: ^7.3.0
    
    Client:
    @apollo/client: ^3.6.9
    @testing-library/jest-dom: ^5.16.4
    @testing-library/react: ^11.1.0
    @testing-library/user-event: ^13.5.0
    graphql: ^16.6.0
    jwt-decode: ^3.1.2
    react: 17.0.2
    react-dom: 17.0.2
    react-router-dom: ^6.3.0
    react-scripts: 5.0.1
    
    Server:
    apollo-server-express: ^3.10.1
    bcrypt: ^4.0.1
    express: ^4.17.1
    faker: ^4.1.0
    graphql: ^16.6.0
    jsonwebtoken: ^8.5.1
    mongoose: ^5.9.9

## How To Use
To use, simply create an account by inputing your desired username, email, and password. You can then start posting, commenting, and creating your own card inventory.

To run locally, in the CLI root directory run the command
`npm install
npm run develop `
If the concurrently npm package installs and runs correctly, both the client and server side should start and the app should launch in the browser and be usable.
If not, navigate to the client and server folders in the command line and run `npm i` separately. Then, in the client side, run `npm start` and in the server side run `npm run watch`.
This should start the client and server separately.

![project3_ss0](https://user-images.githubusercontent.com/101528994/186567736-bf3d1a18-0652-4cf5-8cc4-22dcd63539e2.png)
![project3_ss1](https://user-images.githubusercontent.com/101528994/186567750-c27ddf11-507b-4713-8774-8a7962963a0c.png)
![project3_ss2](https://user-images.githubusercontent.com/101528994/186567761-b9535c33-2c7f-41fa-b752-97fc61bae39f.png)
