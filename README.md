# MongoDB Mock Example

This sample repository provides a sample function to connect to a MongoDB server as well as
perform CRUD operations on a user collection.

## Setup

To set this sample repository up, an `.env` file is mandatory. There is only one environment
variable required, MONGO_URL.

```
MONGO_URL=<your mongo server connection string>
```

## Running Tests

To run unit tests you have to install dependencies by running `npm install`. From there tests
can be run using the `npm run test`.