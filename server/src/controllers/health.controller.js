function getHealth(req, res) {
  res.status(200).json({
    status: "ok",
    service: "dashlyze-api",
    timestamp: new Date().toISOString()
  });
}

module.exports = { getHealth };