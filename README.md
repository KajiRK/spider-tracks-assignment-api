# Spider Tracks Assignment - API Application

 API application developed using NodeJs, Express & MongoDB

## API Details

| Actions | Method | Endpoints |
| :---   | :---   | :---   |
| Get all customers | GET | /api/customers |
| Create customer | POST | /api/customers |
| Get a customer | GET | /api/customers/:id |
| Update customer | PUT | /api/customers/:id |
| Update customer status | PATCH | /api/customers/:id/status |
| Create opp | POST | /api/customers/:id/opps |
| Update opp | POST | /api/customers/:id/opps/:oppId |

## API Postman Collection 

 Find postman collection exported file from docs folder under root directory.

## .env Values

- PORT:3000 #To mention which port to run the API application
- DB_CONNECTION_STRING: #MongoDB connection string with collection name

## Scripts 

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.