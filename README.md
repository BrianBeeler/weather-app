# weather-app

#prompt:

Build an interface that prompts a user’s location and displays the current weather info about the location. Integrate whichever weather source you feel comfortable integrating and explain why you selected that source.

The app should require a user to sign in (does not need to be a full authentication process, just ask for a username to track the user), and the user should be able to setup multiple locations to check weather. When the app updates the weather info, it should update each location. The users and their locations should be stored in a database.

This task can be solved in whichever language you prefer. Please use whichever language you feel best showcases your skills.

Commit the code to GitHub, BitBucket, or other hosted Git repository and share it with our team to review.




#initial research, planning

1. Build an interface that prompts a user’s location - 
      TODO: Create a React app, use window.prompt to get a location
2. User’s location and displays the current weather info about the location 
      TODO: create a location api - node to google places api
3. Displays the current weather info about the location. 
      TODO: Integrate whichever weather source - weather.gov is accurate and has an api
      TODO: Design and impliment UI for weather display
4. The app should require a user to sign in (username onloy)
      TODO: Create API to post a username to the database
5. The user should be able to setup multiple locations to check weather
      TODO: Create a locations table in database tied with key tied to users
6. Please use whichever language you feel best showcases your skills: JavaScript, Node, mysql, maybe python
7. Commit the code to GitHub: 10-4 


TODO w. estimates:

- Tutorials on LATEST react, node, mysql best practices (5 hours)
- Spin up a react app with cli (30 mins)
- Create a simple prompt to ask user for location (30 mins)
- Spin up a node server (3 hours)
- Create API 
      - Get hello world (1 hour)
      - Get locations (2 hours)
      - Get weather (3 hours)
      - Post user (2 hours)
      - Post user location (2 hours)
- Instantiate mongo db (2 hours)
      - Create user table (1 hour)
      - Create location table (1 hour)
- Integration
      - Create UI for sign in, and post to api (3 hours)
      - Create UI for saving location, and post to api (3 hours)
      - Create api - to db getters/setters (3 hours)
- UI
      - Styling (5 hours)
- Code and documentation (3 hours)
      - Make sure code runs on all machines and is easy to set up
      - Refactor code, add comments where needed, update readme

Total estimate: Total hours: 40


Planning, take 2:

1. Have a working get request from the client to the db (5 hours)
2. Build out other layers of the API (10 hours)
3. Complete UX (5 hours)
4. Unit testing, and documentation (5 hours)


src:
https://bezkoder.com/react-node-express-mysql/
