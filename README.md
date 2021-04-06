# weather-app

# prompt:

Build an interface that prompts a user’s location and displays the current weather info about the location. Integrate whichever weather source you feel comfortable integrating and explain why you selected that source.

The app should require a user to sign in (does not need to be a full authentication process, just ask for a username to track the user), and the user should be able to setup multiple locations to check weather. When the app updates the weather info, it should update each location. The users and their locations should be stored in a database.

This task can be solved in whichever language you prefer. Please use whichever language you feel best showcases your skills.

Commit the code to GitHub, BitBucket, or other hosted Git repository and share it with our team to review.



# Planning and work estimates:

1. Have a working get request from the client to the db (5 hours) - actual ~10 hours
2. Build out other layers of the API (10 hours)                   - actual ~15 hours
3. Complete UX (5 hours)                                          - actual ~5  hours
4. Testing, refactoring and documentation (5 hours)               - actual ~5  hours
5. Refactoring into React App (10 hours)                          - actual ~10 hours

The backend architecture was heavily influenced by the following src:
https://bezkoder.com/react-node-express-mysql/

# Stack

Clientside:

V1
1.    (Now removed! See old commits, if interested!)
2.    vanilla js,css,html -> see app/*  
3.    View/controller/model => app.js
4.    Services that talk to api => services.js

V2 
1. React App
2. React components in react-app/src/components/*
3. API services in react/app/src/services.js
4. /react-app/index renders react-app/App.js renders components

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
      - I've trusted weather.gov as my own weather source for a long time, so I trust its accuracy

# Possible Improvements
      - Authentication
      - Refacter all services and api logic with async/await
      - Get deployment working with a hosted database config

# Proudest moment
      - In app.js Promise.All worked like expected on almost the first try
      

# Setup



MySQl
1. Install mysql server: https://dev.mysql.com/downloads/mysql/
2. Make sure mysql server is running locally
3. Use mysql cli to create db: "testdb"
4. Make sure your credentials align with what is in db.config.js

Clone
1. git clone https://github.com/BrianBeeler/weather-app.git

Dependencies
1. "cd weather-app", "npm install"
2. "cd react-app", "yarn install" 

Build
1. "cd react-app", "npm run build", "cd ..", "node server.js" -> Creates a build file that will be served on localhost:8080

Development
1. "node server.js" --> starts server, the build version of the app should be visible on port 8080
2. "cd react-app", "yarn start" --> starts react app for live development on port 3000


Deployment to heroku
1. Updates are automatically deployed to https://brians-weather-app.herokuapp.com/
~~Update: Deployed app is running. It make take some time for the initial load.~~
2. AWS hosting currently removed for cost saving; deployed api is not currently in use 
