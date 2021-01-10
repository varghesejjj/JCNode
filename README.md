# Just Clean Node App

## Prerequisites: 
node, npm, mysql postman(not necessary)


## How to run the application:

1) Clone the app or download the code source.

2) Navigate into the directory of the application and run ***npm install***

3) Create a .env file in the root directory of the project and add the following fields:
    * SECRET : The Secret key which is used for tokenization
    * DB_USER : The database user credential
    * DB_PASSWORD : Password of the db user
    * DB_DATABASE : Database name
  
4) Run the application by using nodemon index
 
5) To Seed the Tower and Office Tables with default values use : 
      * sequelize db:seed:all 

## Usage
## 1) Creating a new tower :

 ### Request

`POST /towers`

    curl -i -H 'Accept: application/json' http://localhost:3000/towers
    
 ### Response

    {
    "success": true,
    "tower": {
        "id": 31,
        "name": "Tower 6",
        "location": "Ajman",
        "floors": "0",
        "rating": "4.6",
        "latitude": "33.4452",
        "longitude": "60.2123",
        "updatedAt": "2021-01-10T09:58:11.162Z",
        "createdAt": "2021-01-10T09:58:11.162Z"
      }
     }
The POST method requires the user to be signed in and the unique token is sent in the header. 
It also requires the following fields provided as a url-encoded-form (req.body): 
   * name 
   * location
   * floors
   * rating
   * longitude
   * longitude

## 2) Creating a new Office in a tower :

 ### Request

`POST /offices/:id` 
id is the tower id

    curl -i -H 'Accept: application/json' http://localhost:3000/offices/id
    
 ### Response

    {
    "success": true,
    "office": {
        "id": 6,
        "name": "Office 2",
        "branch": "1",
        "office_no": "B456",
        "towerId": "1",
        "updatedAt": "2021-01-10T10:21:44.784Z",
        "createdAt": "2021-01-10T10:21:44.784Z"
    }
    }
The POST method requires the user to be signed in and the unique token is sent in the header. 
It also requires the following fields provided as a url-encoded-form (req.body): 
   * name 
   * branch
   * office_no


## 3) Listing all Towers :

 ### Request

`GET /towers`

    curl -i -H 'Accept: application/json' http://localhost:3000/towers
    
 ### Response

    {
     "success": true,
    "towers": {
        "totalItems": 8,
        "towers": [
            {
                "id": 1,
                "name": "First Tower",
                "location": "location1",
                "floors": 9,
                "numberofoffices": 0,
                "rating": 3.8,
                "latitude": 24.788,
                "longitude": 67.433,
                "createdAt": "2021-01-10T09:37:25.000Z",
                "updatedAt": "2021-01-10T09:37:25.000Z",
                "Office": [
                    {
                        "id": 1,
                        "name": "First Office",
                        "branch": 2,
                        "office_no": "A123",
                        "createdAt": "2021-01-10T09:42:45.000Z",
                        "updatedAt": "2021-01-10T09:42:45.000Z",
                        "towerId": 1
                    }
                ]
            },
            {
                "id": 2,
                "name": "Second Tower",
                "location": "location2",
                "floors": 19,
                "numberofoffices": 1,
                "rating": 4.2,
                "latitude": 20.788,
                "longitude": 62.433,
                "createdAt": "2021-01-10T09:37:25.000Z",
                "updatedAt": "2021-01-10T09:37:25.000Z",
                "Office": [
                    {
                        "id": 2,
                        "name": "Second Office",
                        "branch": 1,
                        "office_no": "B456",
                        "createdAt": "2021-01-10T09:42:45.000Z",
                        "updatedAt": "2021-01-10T09:42:45.000Z",
                        "towerId": 2
                    },
                    {
                        "id": 5,
                        "name": "Fifth Office",
                        "branch": 1,
                        "office_no": "E256",
                        "createdAt": "2021-01-10T09:42:45.000Z",
                        "updatedAt": "2021-01-10T09:42:45.000Z",
                        "towerId": 2
                    }
                ]
            },
            {
                "id": 3,
                "name": "Third Tower",
                "location": "location3",
                "floors": 20,
                "numberofoffices": 2,
                "rating": 2.4,
                "latitude": 21.788,
                "longitude": 50.433,
                "createdAt": "2021-01-10T09:37:25.000Z",
                "updatedAt": "2021-01-10T09:37:25.000Z",
                "Office": [
                    {
                        "id": 3,
                        "name": "Third Office",
                        "branch": 2,
                        "office_no": "C789",
                        "createdAt": "2021-01-10T09:42:45.000Z",
                        "updatedAt": "2021-01-10T09:42:45.000Z",
                        "towerId": 3
                    },
                    {
                        "id": 4,
                        "name": "Forth Office",
                        "branch": 3,
                        "office_no": "D134",
                        "createdAt": "2021-01-10T09:42:45.000Z",
                        "updatedAt": "2021-01-10T09:42:45.000Z",
                        "towerId": 3
                    }
                ]
            },
            {
                "id": 4,
                "name": "Forth Tower",
                "location": "location4",
                "floors": 30,
                "numberofoffices": 2,
                "rating": 4.2,
                "latitude": 9.788,
                "longitude": 66.433,
                "createdAt": "2021-01-10T09:37:25.000Z",
                "updatedAt": "2021-01-10T09:37:25.000Z",
                "Office": []
            },
            {
                "id": 5,
                "name": "Fifth Tower",
                "location": "location5",
                "floors": 50,
                "numberofoffices": 0,
                "rating": 4.5,
                "latitude": 27.788,
                "longitude": 61.433,
                "createdAt": "2021-01-10T09:37:25.000Z",
                "updatedAt": "2021-01-10T09:37:25.000Z",
                "Office": []
            },
            {
                "id": 31,
                "name": "Tower 6",
                "location": "Ajman",
                "floors": 35,
                "numberofoffices": null,
                "rating": 4.6,
                "latitude": 33.4452,
                "longitude": 60.2123,
                "createdAt": "2021-01-10T09:58:11.000Z",
                "updatedAt": "2021-01-10T09:58:11.000Z",
                "Office": []
            }
        ],
        "totalPages": 1,
        "currentPage": 0
      }
     }
The GET method can take the following parameters:
   ### For Sorting
   * sort=(ASC, DESC)
   * sortby=(which field to sort by)
   
   ### For Pagination
   * page=(which page to render)
   * size=(number of items in a single page)
   
   ### To show towers with offices only
   * showwithoffices=(true or false)
   
   ### For filtering
   * minoffices=(minimum number of offices in the tower)
   * maxoffices=(maximum number of offices in the tower)
   * location=(Location of the Tower)
   

## 4) Getting details of 1 Tower using its id :

 ### Request

`GET /towers/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/towers/2
    
 ### Response
      
      {
      "success": true,
    "tower": {
        "id": 2,
        "name": "Second Tower",
        "location": "location2",
        "floors": 19,
        "numberofoffices": 1,
        "rating": 4.2,
        "latitude": 20.788,
        "longitude": 62.433,
        "createdAt": "2021-01-10T09:37:25.000Z",
        "updatedAt": "2021-01-10T09:37:25.000Z",
        "Office": [
            {
                "id": 2,
                "name": "Second Office",
                "branch": 1,
                "office_no": "B456",
                "createdAt": "2021-01-10T09:42:45.000Z",
                "updatedAt": "2021-01-10T09:42:45.000Z",
                "towerId": 2
            },
            {
                "id": 5,
                "name": "Fifth Office",
                "branch": 1,
                "office_no": "E256",
                "createdAt": "2021-01-10T09:42:45.000Z",
                "updatedAt": "2021-01-10T09:42:45.000Z",
                "towerId": 2
            }
        ]
    }
    }


## 5) Searching a tower using its name or location :

 ### Request

`GET /towersearch`

    curl -i -H 'Accept: application/json' localhost:3000/api/towersearch?search=wer
    
 ### Response
      
      {
      " "success": true,
        "tower": [
        {
            "id": 1,
            "name": "First Tower",
            "location": "location1",
            "floors": 9,
            "numberofoffices": 1,
            "rating": 3.8,
            "latitude": 24.788,
            "longitude": 67.433,
            "createdAt": "2021-01-10T09:37:25.000Z",
            "updatedAt": "2021-01-10T10:21:44.000Z",
            "Office": [
                {
                    "id": 1,
                    "name": "First Office",
                    "branch": 2,
                    "office_no": "A123",
                    "createdAt": "2021-01-10T09:42:45.000Z",
                    "updatedAt": "2021-01-10T09:42:45.000Z",
                    "towerId": 1
                },
                {
                    "id": 6,
                    "name": "Office 2",
                    "branch": 1,
                    "office_no": "B456",
                    "createdAt": "2021-01-10T10:21:44.000Z",
                    "updatedAt": "2021-01-10T10:21:44.000Z",
                    "towerId": 1
                }
            ]
        },
        {
            "id": 2,
            "name": "Second Tower",
            "location": "location2",
            "floors": 19,
            "numberofoffices": 1,
            "rating": 4.2,
            "latitude": 20.788,
            "longitude": 62.433,
            "createdAt": "2021-01-10T09:37:25.000Z",
            "updatedAt": "2021-01-10T09:37:25.000Z",
            "Office": [
                {
                    "id": 2,
                    "name": "Second Office",
                    "branch": 1,
                    "office_no": "B456",
                    "createdAt": "2021-01-10T09:42:45.000Z",
                    "updatedAt": "2021-01-10T09:42:45.000Z",
                    "towerId": 2
                },
                {
                    "id": 5,
                    "name": "Fifth Office",
                    "branch": 1,
                    "office_no": "E256",
                    "createdAt": "2021-01-10T09:42:45.000Z",
                    "updatedAt": "2021-01-10T09:42:45.000Z",
                    "towerId": 2
                }
            ]
        },
        {
            "id": 3,
            "name": "Third Tower",
            "location": "location3",
            "floors": 20,
            "numberofoffices": 2,
            "rating": 2.4,
            "latitude": 21.788,
            "longitude": 50.433,
            "createdAt": "2021-01-10T09:37:25.000Z",
            "updatedAt": "2021-01-10T09:37:25.000Z",
            "Office": [
                {
                    "id": 3,
                    "name": "Third Office",
                    "branch": 2,
                    "office_no": "C789",
                    "createdAt": "2021-01-10T09:42:45.000Z",
                    "updatedAt": "2021-01-10T09:42:45.000Z",
                    "towerId": 3
                },
                {
                    "id": 4,
                    "name": "Forth Office",
                    "branch": 3,
                    "office_no": "D134",
                    "createdAt": "2021-01-10T09:42:45.000Z",
                    "updatedAt": "2021-01-10T09:42:45.000Z",
                    "towerId": 3
                }
            ]
        },
        {
            "id": 4,
            "name": "Forth Tower",
            "location": "location4",
            "floors": 30,
            "numberofoffices": 2,
            "rating": 4.2,
            "latitude": 9.788,
            "longitude": 66.433,
            "createdAt": "2021-01-10T09:37:25.000Z",
            "updatedAt": "2021-01-10T09:37:25.000Z",
            "Office": []
        },
        {
            "id": 5,
            "name": "Fifth Tower",
            "location": "location5",
            "floors": 50,
            "numberofoffices": 0,
            "rating": 4.5,
            "latitude": 27.788,
            "longitude": 61.433,
            "createdAt": "2021-01-10T09:37:25.000Z",
            "updatedAt": "2021-01-10T09:37:25.000Z",
            "Office": []
        },
        {
            "id": 31,
            "name": "Tower 6",
            "location": "Ajman",
            "floors": 35,
            "numberofoffices": null,
            "rating": 4.6,
            "latitude": 33.4452,
            "longitude": 60.2123,
            "createdAt": "2021-01-10T09:58:11.000Z",
            "updatedAt": "2021-01-10T09:58:11.000Z",
            "Office": []
        }
    ]
    }
    
The SEARCH method requires that the SEARCH Query is provided as search=....

## 6) Updating details of a tower :

 ### Request

`PUT /towers/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/towers/2?_method=PUT
    
 ### Response
      
      {
          success: true,
          message: "Tower data was updated successfully",
      }
The Update method requires the user to be signed in and the unique token is sent in the header.


## 7)Deleting a tower :

 ### Request

`DELETE /towers/:id`

    curl -i -H 'Accept: application/json' DELETE http://localhost:3000/towers/2
    
 ### Response
      
      {
         "success": true,
         "message": "Tower deleted successfully"
      }
The DELETE method requires the user to be signed in and the unique token is sent in the header.



