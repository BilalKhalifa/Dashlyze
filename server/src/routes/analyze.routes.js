const express = require("express");
const {analyzeDataSet} = require("../controllers/analyze.controller");

const router = express.Router();

router.post("/", analyzeDataSet);

module.exports = router;