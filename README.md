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
