const express = require('express');
const bodyParser = require('body-parser');
const booksRoute = require('./routes/books');
const libraryRoute = require('./routes/library');
const connectToDB = require('./db/connect');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(bodyParser.json())
app.use(express.static('./public'));

// routes
app.use('/api/v1/library', libraryRoute);
app.use('/api/v1/books', booksRoute);

const startServer = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}`));

    } catch (error) {
        console.error(error)
    }
}

startServer();