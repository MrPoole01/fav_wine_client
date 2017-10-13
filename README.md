![mVino](images/wine_logo.png)
# mVino
mVino was created for those time you have a chance
to experience a great wine selection. Now you are able to make a running list of those beloved selections.

Link to Live site => https://fav-wine-app.firebaseapp.com/

## Technology Used:
- Firebase
- Heroku
- Postgresql
- JavaScript ES6
- Knex JS
- HTML5
- CSS3

## Set up a local postgres database 
- npm install knex -g
- npm install
- knex migrate:latest
- knex seed:run
- npm run dev-start
- Go to port 3000 in your browser :)
- Deploy your own version to Heroku

## Set up a Heroku app for your project
- Set up a Heroku postgres database
- C- reate a .env file, use .env.example as a reference
- knex migrate:latest --env production
- knex seed:run --env production

