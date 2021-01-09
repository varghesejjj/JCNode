# Just Clean Node App

## Prerequisites: 
node, npm, postman(not necessary)


## How to run the application:

1) Clone the app or download the code source.

2) Navigate into the directory of the application and run ***npm install***

3) Create a .env file in the root directory of the project and add the following fields:
    * SECRET : The Secret key which is used for tokenization
    * DB_USER : The database user credential
    * DB_PASSWORD : Password of the db user
    * DB_DATABASE : Database name
  
4) Run the application by using nodemon index
 
5) To Seed the Tower Table with default values use : 
      * sequelize db:seed:all 
