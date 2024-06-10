const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');


const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');


const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;
const url = "mongodb+srv://easwanth123:AbYIaNzfzyeXEyaF@cluster0.bkvrbcv.mongodb.net/SpeakX";

mongoose.connect(url)
  .then(() => { console.log("Connected to MongoDB"); })

const startServer = async () => {
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
      context: ({ req }) => ({ req }) 
    });
  await server.start();
  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Server is running`);
  });
};

startServer();
