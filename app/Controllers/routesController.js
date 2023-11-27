const express = require('express');

const router = express.Router();
const mainModel = require('../Models/mainModel.js');

router.get('/', async (req, res) => {
  const data = await mainModel.getData();
  res.send(data);
});

module.exports = router;
