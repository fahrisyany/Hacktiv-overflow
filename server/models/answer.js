const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const answerSchema = new Schema(
  {
    answerBody: {
      type: String,
      required: [true, "Please input your comment"]
    },
    upvote: 0,
    downvote: 0,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    questionId: {
      require: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    },
    upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },

  {
    timestamps: true
  }
);

var Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
