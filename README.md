# 🏗️ Tech Blog

Link : https://vast-woodland-74466.herokuapp.com/

## Description 📖

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies.

The Tech Blog application is a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

## Features 📝

The Tech Blog application follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. 

## Screenshots 📷 :

* User is presented with a landing page where they can see recent posts:

  ![alt text](./Assets/screenshot1.png)
  
* User presented with login or sign up page:

  ![alt text](./Assets/screenshot2.png)

* User dashboard where they can create a new post and view history of posts:

  ![alt text](./Assets/screenshot3.png)

* User can leave a comment on someone else's post:

  ![alt text](./Assets/screenshot4.png)
  

## Takeaways 💡


----
© 2021 Caswell Orr. Confidential and Proprietary. All Rights Reserved.


WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```