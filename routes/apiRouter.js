const express = require('express');
const apiRouter = express.Router();

// this will import the routers from the other API paths and use them for their respective endpoints
// e.g. router.use('/user', userRouter)
const contactRouter = require('./contact/contactRouter');

apiRouter.get('/', (req, res) => {
    res.send('This is the API root endpoint.');
});

apiRouter.use('/contact', contactRouter);

module.exports = apiRouter;
