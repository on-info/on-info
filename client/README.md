# ON-INFO CHARITY PROJECT

This project was created for helping special children and their parents.

## Demo

You can go to this link to see the demo [https://charity-test-app.herokuapp.com/](https://charity-test-app.herokuapp.com/)

## Installing dependencies

Use `npm install` for installing new devDependencies

## Deployment

Use `npm start` to deploy the project

## How to use?

### Link to main page:

```
 - Production link : https://charity-test-app.herokuapp.com/
 - Development link: https://localhost:3000/
```

### Link to admin page:

To go on admin's page you should write in path line

```
 - Production link : https://charity-test-app.herokuapp.com/login
 - Development link: https://localhost:3000/login
```

### Adding new admin on the project

If you want to add new admin on the project ,you should go to `charity-server/scripts/initialize.db.js` file, where located function `createUser()` , and change fields (name,email.password) to another. Then you should run this file with a command `node initialize.db.js`

### Database

#### Link's on project's db's:

Database is locating on [https://mlab.com/](https://mlab.com/)

```
 - Production DB: mongodb://charity:charity_godel717@ds241121.mlab.com:41121/charity-database
 - Development DB:mongodb://vadim:qwerty@ds219100.mlab.com:19100/charity-project
```

#### To create a new database:

1. Go to [https://mlab.com/home](https://mlab.com/home) and sign up a new account and verifie your email

- Create new MongoDB Deployment
- Choose cloud provider and plan type then choose region
- Create a new user for your database (choose users tab)

2. Download mongoDB Community Server from [https://www.mongodb.com](https://www.mongodb.com)

- Choose "All Version Binaries" and download the mongoDB Community Server with version which you have on mongoLab (you can see it via clicking on your Dbname)
- For example ---mongod version: 3.4.13---

### Links

##### VK.COM:

[https://vk.com/club169499477](https://vk.com/club169499477)
