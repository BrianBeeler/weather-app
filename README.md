# weather-app

#prompt:

Build an interface that prompts a user’s location and displays the current weather info about the location. Integrate whichever weather source you feel comfortable integrating and explain why you selected that source.

The app should require a user to sign in (does not need to be a full authentication process, just ask for a username to track the user), and the user should be able to setup multiple locations to check weather. When the app updates the weather info, it should update each location. The users and their locations should be stored in a database.

This task can be solved in whichever language you prefer. Please use whichever language you feel best showcases your skills.

Commit the code to GitHub, BitBucket, or other hosted Git repository and share it with our team to review.



#Planning, take 2, with estimates:

1. Have a working get request from the client to the db (5 hours) - actual ~10 hours
2. Build out other layers of the API (10 hours)                   - actual ~15 hours
3. Complete UX (5 hours)                                          - actual ~5  hours
4. Testing, refactoring and documentation (5 hours)               - actual ~5  hours


The backend architecture was heavily influenced by the following src:
https://bezkoder.com/react-node-express-mysql/

# Stack

Clientside 
      -> vanilla js,css,html -> see app/*  
      -> View/controller/model => app.js
      -> Services that talk to api => services.js

Express Server 
      -> server.js

Sequelize ORM 
      -> models/*
      -> config/*

Routes and Logic
      -> routes/*
      -> controllers/*


# Apis

https://www.zipcodeapi.com/API#zipToLoc 
      - Zipcode was used to get coordinate and city information
        based on zipcodes. It is free and easy to user

https://weather-gov.github.io/api/general-faqs
      - Weather.gov is data rich, free, and easy to use. No api
        key is needed, just a unique client tag
      - Note: current conditions were not actually used, the data
        received was the nearest forcast

# Possible Improvements
      - UX/UI design
      - Authentication
      - Refactor front-end into vue/react components
      - Refacter services and api logic with async/await

# Proudest moment
      - In app.js Promise.All worked like expected on almost the first try