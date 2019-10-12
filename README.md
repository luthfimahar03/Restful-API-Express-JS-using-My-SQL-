# Restful-API-Express-JS-using-My-SQL-Point-Of-Sale
![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)
![](https://img.shields.io/npm/v/npm.svg)
<p align="center">
  <a href="https://nodejs.org/">
    <img alt="restfulapi" title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Installation

### Install Packages
```sh
$ npm init
$ npm install express
$ npm install express-fileupload
$ npm install cors
$ npm install jsonwebtoken 
$ npm install uuid 
$ npm install mysql
$ npm install body-parser 
```
### Start Server
```sh
$ npm start
```
## Documentation

### Product Routes

#### GET Request
- **"/products/:id** => get one products from database with specific id
- **"/products"** => get all products data from database. Query params:
  - **"search"** -> search by products name, 
  - **"sort"** -> sorting data based on ascending or descending,
  - **"limit"** -> limitation data per page,
  - **"page"** -> redirect to specific page.

#### POST Request
- **"/products"** => create new data
- **"/products/reduce/:id"** => reduce quantity of the product

#### PATCH Request
- **"/products/:id"** => Update data products


#### DELETE Request
- **"/products/:id"** => Delete a products in database with specific id

### Categories Routes
#### GET Request
- **"/categories/:id"** => get one category from database
- **"/categories"** => get all category data from database.

#### POST Request
- **"/categories"** => create new data to category database

#### PATCH Request
- **"/categories/:id"** => Update data category

#### DELETE Request
- **"/categories/:id"** => Deleting data category in database.
