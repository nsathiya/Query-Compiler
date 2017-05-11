QUERY PARSER

To start server:
1. npm install
2. npm start

To use:
1. Send POST request to 'localhost:3000/find' with JSON-type body (ex.)-
 {
   "query": "( >400 <=500 ) AND ( !false OR =\"This is test\" )"
 }
2. Response-
 {
  "$and": [
    {
      "$and": [
        {
          "$gt": "400"
        },
        {
          "$lte": "500"
        }
      ]
    },
    {
      "$or": [
        {
          "$not": "false"
        },
        {
          "$eq": {
            "$quoted": "This is test"
          }
        }
      ]
    }
  ]
 }

Tests:
Tests for main parse function are under utilities/parserTest.js

Assumptions:
1. Only these operands can be used- >, <, >=, <=, =, "", !, len(), OR, AND
2. If no AND or OR used, implicitly means AND
3. Spaces matter! - dont leave spaces within a token unless if its within a string ""-
  ex. Good -> =\"this is testing\"
  ex. Bad  -> = \"this is testing\"
  ex. Good -> >500
  ex. Bad  -> > 500
  Spaces outside strings should only be between tokens and parentheses
  ex. Good -> >500 !false
  ex. Bad  -> >500!false
  Parentheses NEED space
  ex. Good -> ( >500 <1000 ) AND !false
  ex. Bad  -> (>500 <1000) AND !false //will fail!
  ex. Good -> ( >400 <=500 ) AND ( !false OR >=len(9) )
  ex. Bad  -> (>400 <=500) AND (!false OR >=len(9))
4. If more than 2 elements, parentheses are needed to set order
  ex. Good -> error OR ( info AND test )
  ex. Bad  -> error OR info AND test //will fail!
  ex. Good -> error OR ( info OR test )
  ex. Bad  -> error OR info OR test //will fail!
  ex. Good -> =error OR ( =info AND ( =test OR =flag ) )
  Note: mind spaces!
5. Include escape special characters if sending string over POST request
  ex. Good -> =\"this is testing\"
  ex. Bad  -> = "this is testing" //Some clients wont accept this, ex Postman
