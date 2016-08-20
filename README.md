# project-1
Project 1 - To Do List

## Setup

1. Download `master` branch
2. `cd` into project directory and run `npm install`
3. For angular2, run `cd public/vendor` and run `npm install`
4. From the project base directory, run `npm start` to start the Express server

## Requirements

The project is run via an express server using MongoDB. Therefore, the following are required:

* node
* mongodb

To install:

* Run `npm install` from the project directory
* Run `npm install` from the `public/vendor` directory (this installs angular for the front-end)
* Start the MongoDB server: [Instructions](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/)
* Run `npm start` to run the node server
* Visit [http://localhost:3000](http://localhost:3000)

## Task

#### Requirements

##### Manage Tasks (required)

* As a user, I can add new tasks to my list so that I know what I have to get done.
* As a user, I can mark tasks on my to do list as completed so that I know what I have accomplished.
* As a user, I can set tasks as highly important, moderately important, or of low importance (default) so that I can know what is the most important.
* As a user, I can delete tasks so that my task list is not filled with irrelevant tasks.
* As a user, I can edit tasks that are created so that I can accurately reflect changes.

##### User Registration (optional)

*If you develop a user registration model, you may need to update how the Manage Tasks user stories work depending on whether or not you implement tiered user levels (like admin, member, anonymous user).*

*As a new member, I can register using a email and password to create my own tasks that are only viewable, editable, and able to be deleted by me so that I can maintain privacy.*

##### User Login (optional)

* As a registered member, I can login using the email and password that I registered with to view my tasks.
* As a registered member, I can request a password change if I forgot my password so that I can log in.

#####User Management (stretch optional)

* As an administrator, I can view who has registered so that I can see how popular my application is.
* As an administrator, I can see how many tasks each user has created and how many of them are done so that I can measure user adoption for my application.

#### Submission Guidelines

All teams must utilize GitHub for the submission of their project before or on the deadline specified below. We highly recommend you use Github from the beginning of your project so your work is more organized.

**Project #1** will be submitted by making a pull request with your source to: https://github.com/weeklydev/project-1

**Deadline**: July 20, 2016 UTC 0:00
