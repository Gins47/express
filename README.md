# Sequelize + Express

## Deployment Steps

- Install dependencies with `npm install` or `yarn install`
- Run the express server with `npm start`
- Open your browser in `localhost:8000` and try the example REST endpoints:
  - `localhost:8000/api/users` (GET)
  - `localhost:8000/api/users/1` (GET)
  - `localhost:8000/api/users` (POST)
    - Body format: `{ username: 'john' }`
  - `localhost:8000/api/users/1` (PUT)
    - Body format: `{ username: 'john' }`
  - `localhost:8000/api/users/1` (DELETE)
  - `http://localhost:8080/api/users/getUsersByRange?startDate=%222021-08-28%22&endDate=%222021-08-31%22`(GET)[Gets Date by range]

## Exercise: new model and new controller

Try to create a new model `item.model.js` and a new express route controller `items.js` to handle:

- `GET` and `CREATE` in `/api/items`
- `GET`, `PUT` and `DELETE` in `/api/items/:id`
