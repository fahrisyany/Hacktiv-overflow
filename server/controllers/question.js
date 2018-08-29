const mongoose = require("mongoose");
const Question = require("../models/question");
let jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  createQuestion: function(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { questionTitle, questionBody } = req.body;

    Question.create({
      authorId: decode.id,
      questionTitle: questionTitle,
      questionBody: questionBody
      // upvoteQuestion:[]
    })
      .then(article => {
        res.status(200).json({
          msg: "Adding Questions",
          article
        });
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  },

  showQuestion(req, res) {
    Question.find()
      .populate("authorId")
      .then(question => {
        res.status(200).json({ msg: "all Questions found ", question });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  showMyQuestion(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Question.find({ authorId: decode.id })
      .populate("authorId")

      .then(question => {
        res.status(200).json({ msg: "my Question found ", question });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  showOneQuestion(req, res) {
    Question.find({ _id: req.params.id })
      .populate("authorId")
      .then(question => {
        res.status(200).json({ msg: "one Question found ", question });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  editQuestion(req, res) {
    const { questionTitle, questionBody } = req.body;

    Question.update(
      { _id: req.params.id },
      {
        $set: {
          questionTitle,
          questionBody
        }
      }
    )
      .then(question => {
        res
          .status(200)
          .json({ msg: `Question id = ${req.params.id} edited`, question });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  async upvoteQuestion(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userId = decode.id;

    try {
      let getEvent = await Question.findById(req.params.id);
      // console.log(`====+`, getEvent.upvote);
      let getUser = await User.findById(userId);

      let isAdaDownvote = getEvent.downvote.find(function(element) {
        return element == userId;
      });
      let isAdaUpvote = getEvent.upvote.find(function(element) {
        return element == userId;
      });

      console.log(`Up===>`, isAdaDownvote, isAdaUpvote);

      if (isAdaUpvote) {
        res.json({
          //     message: "Ada bos udah pernah"
        });
        // if (isAdaDownvote) {
        //   res.json({
        //     message: "Ada bos udah pernah"
        //   });
        // }
      } else if (isAdaDownvote) {
        res.json({
          message: "Ada bos udah pernah"
        });
      } else {
        getEvent.upvote.push(getUser._id);
        let updateItem = await Question.findByIdAndUpdate(
          req.params.id,
          getEvent
        );

        res.json({
          getEvent
        });
      }
    } catch (error) {
      res.json({
        error
      });
    }
  },

  async downvoteQuestion(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userId = decode.id;

    try {
      let getEvent = await Question.findById(req.params.id);
      let getUser = await User.findById(userId);

      let isAdaDownvote = getEvent.downvote.find(function(element) {
        return element == userId;
      });
      let isAdaUpvote = getEvent.upvote.find(function(element) {
        return element == userId;
      });

      console.log(`down===>`, isAdaDownvote, isAdaUpvote);

      if (isAdaDownvote == decode.id) {
        // if (isAdaUpvote) {
          res.json({
            message: "Ada bos udah pernah"
          });
        // }
      } else if (isAdaUpvote == decode.id) {
        res.json({
          message: "Ada bos udah pernah"
        });
      } else {
        getEvent.downvote.push(getUser._id);
        let updateItem = await Question.findByIdAndUpdate(
          req.params.id,
          getEvent
        );

        res.json({
          getEvent
        });
      }
    } catch (error) {
      res.json({
        error
      });
    }
  },

  deleteQuestion(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Question.find({ authorId: decode.id })
      // .populate("authorId")
      .then(question => {
        console.log(`>>>>`, question);
        Question.findOneAndRemove({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              msg: `Question id deleted`
            });
          })

          .catch(err => {
            res.status(500).json({ msg: "a", err });
          });
      })

      .catch(err => {
        res.status(500).json({ msg: "b", err });
      });
  }
};
