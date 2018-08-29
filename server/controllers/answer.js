const mongoose = require("mongoose");
const Answer = require("../models/answer");
let jwt = require("jsonwebtoken");
const User = require("../models/user");
const Question = require("../models/question");

module.exports = {
  createAnswer: function(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { answerBody } = req.body;

    Question.find({ _id: req.params.id })
      .then(question => {
        Answer.create({
          userId: decode.id,
          questionId: req.params.id,
          answerBody: answerBody,
          upvote: 0,
          downvote: 0
        })
          .then(answer => {
            res.status(200).json({
              msg: "Adding Answer success",
              answer
            });
          })
          .catch(err => {
            res.status(500).json({
              msg: err.message
            });
          });
      })
      .catch(err => {
        res.status(500).json({
          msg: "Question not found"
        });
      });
  },

  getAnswer: function(req, res) {
    Answer.find({ questionId: req.params.id })
      .populate("userId")
      .then(answer => {
        res.status(200).json({ msg: "Answer/s found ", answer });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  getOneAnswer: function(req, res) {
    Answer.find({ _id: req.params.id })
      .populate("userId")
      .then(answer => {
        res.status(200).json({ msg: "One Answer/s found ", answer });
      })
      .catch(err => {
        res.status(500).json({ msg: "err", err });
      });
  },

  


  async upvoteAnswer(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userId = decode.id;

    try {
      let getEvent = await Answer.findById(req.params.id);
      let getUser = await User.findById(userId);
      // let isMe = 
      let isAda = getEvent.upvote.find(function(element) {
        return element == userId;
      });
      if (isAda) {
        res.json({
          message: "Ada bos udah pernah"
        });
      } else {
        getEvent.upvote.push(getUser._id);
        let updateItem = await Answer.findByIdAndUpdate(
          req.params.id,
          getEvent
        );
        res
          .json({ msg: `upvote success`, });

        res.status(500).json({ msg: "err", err });
      }
    } catch (error) {
      res.json({ msg: "err", err });
    }
  },

  async downvoteAnswer(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userId = decode.id;

    try {
      let getEvent = await Answer.findById(req.params.id);
      // console.log(`====+`, getEvent.upvote);
      let getUser = await User.findById(userId);
      let isAda = getEvent.downvote.find(function(element) {
        return element == userId;
      });
      if (isAda) {
        res.json({
          message: "Ada bos udah pernah"
        });
      } else {
        getEvent.downvote.push(getUser._id);
        let updateItem = await Answer.findByIdAndUpdate(
          req.params.id,
          getEvent
        );
        res
          .json({ msg: `downvote successs`, Answer });
      }
    } catch (err) {
      res.json({ msg: "err", err });
    }
  },

  editAnswer(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Answer.findOne({ userId: decode.id })
      .then(() => {
      const { answerBody } = req.body;


        Answer.update(
          { _id: req.params.id },
          {
            $set: {
              answerBody
            }
          }
        )
          .then(() => {
            res.status(200).json({ msg: `Answer updated` });
          })
          .catch(err => {
            res.status(500).json({ msg: err.message });
          });




      })
      .catch(err => {
        res.status(500).json({ msg: "this is not yours", err });
      });
  }
};
