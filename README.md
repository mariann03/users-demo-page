# Users demo page
User account creation page made with Next.js, Material-ui, Serverless and MySQL.

[ERD](https://dbdiagram.io/d/5e727f374495b02c3b886ef5)

[Demo](https://acamica-demo.now.sh/)

To see all the created users, you must enter with the administrator account (user: admin, password: admin)


## Instructions to deploy locally

### Prequisites
before starting make sure to have installed:
- make
- docker (to create a local db)
- node

### Initializing the local database
1. in ./mysql directory run ```make docker-buld```
2. once the image has been built run ```make docker-start```

(when you want to stop docker just run ```make docker-stop```)

### Runinig the app
1. in ./app directory run ```npm i```
2. then run ```npm run dev```
3. enter to [localhost:3000](http://localhost:3000)

#### and that's it, enjoy!

### Setting up environment (optional)
you can set up your own environment just create an .env.build file at the root and add the following variables
```
MYSQL_HOST=[your_sql_host]
MYSQL_DATABASE=[your_sql_database_name]
MYSQL_USER=[your_db_user]
MYSQL_PASSWORD=[your_db_password]

JWT_SECRET_KEY=[key_to_sign_authorization_token]
JWT_DURATION=[duration_of_token] # a number of seconds or string representing a timespan eg: "1d", "20h", 60.
SALT_ROUNDS=[salt_rounds_to_encrypt_passwords_bycript]
```
