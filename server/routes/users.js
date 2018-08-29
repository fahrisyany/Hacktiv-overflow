var express = require("express");
var router = express.Router();
const {
  createQuestion,
  showQuestion,
  showOneQuestion,
  deleteQuestion,
  editQuestion,
  showMyQuestion,
  upvoteQuestion,
  downvoteQuestion
} = require("../controllers/question");

const {
  createAnswer,
  getAnswer,
  editAnswer,
  getOneAnswer
} = require("../controllers/answer");
const isLogin = require("../helpers/isLogin");

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

router
  .get("/showQuestion", showQuestion)
  .get("/getAnswer/:id", getAnswer)
  .get("/showOneQuestion/:id", showOneQuestion)
  .get("/showMyQuestion", isLogin, showMyQuestion)
  .put("/upvoteQuestion/:id", upvoteQuestion)
  .put("/downvoteQuestion/:id", downvoteQuestion)

  .get("/getOneAnswer/:id", getOneAnswer)

  .post("/createQuestion", createQuestion)
  .post("/createAnswer/:id", createAnswer)
  .put("/editAnswer/:id", editAnswer)
  .put("/editQuestion/:id", editQuestion)
  .delete("/deleteQuestion/:id", deleteQuestion);

module.exports = router;
