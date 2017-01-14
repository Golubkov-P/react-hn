React Hacker News client

![alt text](https://github.com/Golubkov-P/react-hn/blob/master/react-hn.gif "React Hacker News preview")

## Features

* Es6
* Infinity scroll
* New, Ask, Show, Job pages
* Compact user profile
* Stories page with comments
* Show/hide comments
* Information about deleted comments

## Frameworks and Libraries

* React
* React-router
* moment.js

## Build tools

* Webpack
* webpack-dev-server

## Usage

```
  git clone https://github.com/Golubkov-P/react-hn.git
  npm install
  npm run devserver
```

## Notice

If your system differes of Windows change this command in package.json:

```
"build": "set NODE_ENV=production&& webpack -p"
"nodemon-prod": "set NODE_ENV=production&& nodemon server.js"
```
to 
```
"build": "NODE_ENV=production&& webpack -p"
"nodemon-prod": "NODE_ENV=production&& nodemon server.js"
``` 