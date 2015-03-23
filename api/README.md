# An API built on hapi.js

This web API was built to demonstrate some of the [hapi](hapijs.com) features and functionality.
The API is based on a simple student model that allows you to create, update, delete (soft), list or get by Id.

## hapi-swagger
The project makes use of a hapi.js plugin [hapi-swagger](https://github.com/glennjones/hapi-swagger) which self documents the API using the [Swagger UI](https://github.com/wordnik/swagger-ui) interface. Additionally, it provides some simple forms which developers can use to quickly interact with your API and learn how it works. The forms and documentation are built from the standard hapi.js routes object.


## Install
You first need to install [node.js](http://nodejs.org/) and [mongodb](http://www.mongodb.org/downloads) if you do not already have them on your computer. Then download the code from github: 

    $ git clone git@github.com:rantoine/samplehapi.git
       
    
## Run

1. Move into the project directory `$ cd samplehapi`
2. Run `$ npm install`
3. Insure that your mongodb server is running `$ mongod`
4. Run `$ node server.js`
5. Connect to the server using `http://localhost:9000`


## Students
All the student endpoints are http requests.
    http://localhost:9000/api/students
    
If the above request is completed without error and there are student(s) in your database:

    {
        
    }


## Errors

The error format always has 3 properties; code, error and message. There is an optional fourth property validation which is added if the input is in the incorrect format. 
    
    {
      	"code": 400,
  		"error": "Bad Request",
  		"message": "the value of b must be a number",
  		"validation": {
    		"source": "path",
    		"keys": [
      		"b"
    		]
  		}
	}



## Mocha integration test - Pending
The project has example integration and unit tests. To run the test within the project type the following command

    $ npm test



