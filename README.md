# learn-graphql

learn-graphql

Getting Started with GraphQL and DataLoader
w/ Samer Buna @samerbuna
Holiday Inn Golden Gateway
1500 Van Ness Ave, San Francisco, CA 94109
July 30, 9:30am - 4:30pm

https://forwardjs.com/#getting-started-with-graphql-40ea99af-a526-4f18-ac42-c588701ad9c0

// 1. use http://opentable.herokuapp.com/api/restaurants?state=CA&per_page=100

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
