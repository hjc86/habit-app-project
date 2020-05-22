# Habit-App
![alt text](https://github.com/richardderoure/habit-app/blob/master/images/HabitChecker.png?raw=true)

Habit Checker allows users to personalise and track their own habits using an intuitive web interface.

## Installation Instructions:

1. Download/Pull the repository onto your machine.
2. Open a new terminal and navigate into habit-app
3. Run `npm install`
4. Once installed, run `npm start`
5. Open a second terminal and navigate into backend
6. Run `npx nodemon server.js`
7. On your browser, if not done so automatically, open http://localhost:3000
8. Use postman with http://localhost:3001 to test server routes
9. To run front end tests, run npm test from within habit-app terminal
10. To run back end tests, run npm run test-server from within habit-app terminal

## User Stories:

![alt text](https://github.com/richardderoure/habit-app/blob/master/images/userStories.png?raw=true)

## Technologies:

* HTML
* CSS
* Express.js
* Node.js
* React-bootstrap
* Mocha + Chai
* Jest + Enzyme
* React.js - create-react-app
* React-icons
* knex.js

## Day 1
We had a group discussion on website design, database logic/design, and technology we will use.  
We decided on a locally stored sqlite3 database, with queries generated using knex.
React, using create-react-app, for the front-end. Bootstrap is also used for styling.
We decided to first implement back-end functionality as a 4.

## Day 2
### Standup
Achieved: created database, created all routes, login page (create account, login page), all query functions (knex)
Want to achieve:
* Plan (and create) dashboard container components
* Include a redirect to dashboard on login success
* Make password characters asterix   

Blockers: working as a group as at the moment no sensible way to fork 
* Pair 1: modals for add new habit component DONE
* Pair 2: dashboard to setup and display relevant components, correct linking and correct transfer of state

## Day 3
### Standup
Achieved yesterday: 
* Created dashboard container components https://wireframe.cc/r5PP0d
* Include a redirect to dashboard on login success
* Make password characters asterix 

To achieve today:
* Add alert messages 
* Add Data validation to create new account and update account functions
* General bug fixes and error checking
* Habit ‘tile’ data display of the following: completed, streak, over-completion
* Add habit tile information display based on grammar  

## Day 4
### Standup
Achieved yesterday:
* Added alert messages 
* Data validation to create new account and update account functions
* General bug fixes and error checking
* Habit ‘tile’ data display of the following: completed, streak, over-completion
* Added dynamic-ish habit tile information display based on grammar  

To achieve today:
* Have a no habits message showing on the dashboard if no present habits
* Fix error where we go back to login screen on enter of the ‘update amount’ modal
* Add a warning box to confirm habit delete
* Testing
  * Backend : Enzyme and Jest
  * React: Enzyme and Jest
* Styling
  * Decide on color scheme
  * Decide on icon size, color etc
  * Appropriate size for habit tile buttons
Create dummy data for seeding tables
* Blockers:
  * Willingness to test :(
* Pairs:
  * 1 => Testing what they can Helder, Matt
  * 2 => Style Richard, Medyen

## Day 5
### Standup
Achieved yesterday:
* Added back-end testing using Mocha and Chai. Coverage checking done using Istanbul. >80% testing coverage
* Added front-end testing using Enzyme and Jest. Low testing coverage
* Added a lot more styling.
  * Better colouring
  * Habit components coloured and positioning better.
  * Navbar tidied up
  * Added icons to each Habit for more intuitive use of readability
* General bug fixes and error checking  

To Achieve today:
* Do a final merge of new testing and styling branches for a completed project.
* Add more react testing
* Fix any final bugs and errors
