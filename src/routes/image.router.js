const { getAll } = require('../controllers/image.controller');
const express = require('express');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(getAll)

module.exports = imageRouter;