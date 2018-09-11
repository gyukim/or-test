var express = require("express");
var mysql = require("mysql");
const path = require("path");
var router = express.Router();
// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "or"
// });

// db.connect();
router.get("/", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering`, function(error, topics) {
    res.send(topics);
  });
});

router.get("/", function(req, res, next) {
  db.query(`SELECT * FROM data_numbereeeeeeeeeeeeeeeeing`, function(error, topics) {
    res.send(topics);
  });
});
router.get("/rand", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY RAND()`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/subjectName", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY subjectName`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/subjectName/reverse", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY subjectName DESC`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/school", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY school`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/school/reverse", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY school DESC`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/year", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY year`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/year/reverse", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY year DESC`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/subjectName/rand", function(req, res, next) {
  db.query(
    `SELECT dataNumber,subjectName FROM data_numbering ORDER BY RAND()`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/textList", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering`, function(error, topics) {
    res.send(topics);
  });
});

router.get("/image/thum/:imgeNum" + ".jpg", function(req, res, next) {
  var fileNum = req.params.imgeNum;
  res.set({
    "Content-Type": "image/jpeg"
  });
  res.sendFile(
    path.join(
      __dirname,
      "../public/images",
      fileNum + "/" + fileNum + "_thumb.jpg"
    )
  );
  // res.send(__dirname+'../public/images/'+'1/1_1.jpg');
});

router.get("/textList/rand", function(req, res, next) {
  db.query(`SELECT * FROM data_numbering ORDER BY RAND()`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/:id", function(req, res, next) {
  res.send("ss");
});

module.exports = router;
