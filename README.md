# learn-graphql

learn-graphql

> Getting Started with GraphQL and DataLoader
> w/ Samer Buna
> @samerbuna

https://forwardjs.com/#getting-started-with-graphql-40ea99af-a526-4f18-ac42-c588701ad9c0

// http://opentable.herokuapp.com/api/restaurants?state=CA&per_page=100

```javascript
query {
  restaurants(search: "max") {
    name
    address
    city
  }
}
```

```bash
source .env
npx nodemon server.js
```

## Resources

- https://postgresapp.com/

- https://eggerapps.at/postico/

- https://github.com/jscomplete/react-blog-example

- https://github.com/graphql/graphql-js

- https://opentable.herokuapp.com/

- https://github.com/facebook/dataloader

- https://www.graphqlhub.com/
