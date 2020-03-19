const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();
server.use(express.json());

//note: this mount the api endpoints running on hubsRouter to be able to use [ /api/hubs & /junk]
server.use('/api/posts', postsRouter);

//root of API
server.get('/', (req, res) => {
    const messageOfTheDay = process.env.MOTD;
    res.send(messageOfTheDay);
});

module.exports = server;