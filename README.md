# IoT-RaspberryPi-Weather-Monitoring

## Description
The project was created for EEL5934: IoT Design, Fall 2017 at the University of Florida, to accurately read the temperature and humidity of a small-scale local area using Raspberry Pi 2.

## Technology Involved
- Angular 4
- Material Design
- TypeScript
- NodeJs
- MongoDB

## Installation
### Node v4.2.0
Install node v4.2.0 from https://nodejs.org/en/download/

### Mongo
- Follow instructions on https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ to install MongoDB on Windows.


### Install Dependencies
- `npm install` - To install all required node modules

### Backend API
- ``` GET users/ ``` - Returns an array of temperature and humidity
- ``` POST users/ ``` - Insert temperature, humidity, year, month, day, hour, city
- ``` GET users/closest ``` - Returns 10 most recent temperature and humidity values recorded.
- ``` GET users/year ``` - Returns temperature and humidity values for the mentioned year (mandatory param) and city (optional param)
- ``` GET users/month ``` - Returns temperature and humidity values for the mentioned month (mandatory param) and city (optional param)
- ``` GET users/day ``` - Returns temperature and humidity values for the mentioned day (mandatory param) and city (optional param)

## How To Run
1. `npm install` - To install all required node modules
2. `mongod --dbpath data` - To start the Mongo server and store data in the `data` folder
3. `node www` - To be run in a separate terminal to start the node server. It runs on port 8000.
4. `ng build` - To be run in a separate terminal to build the angular app
5. In a browser, go to "localhost:4200" to access the website
