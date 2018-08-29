const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema(
  {
    questionTitle: {
      type: String,
      //   required: [true, "Please input your article title"],
      unique: [true, "title already registered please insert different title"]
    },
    questionBody: {
      type: String,
      required: [true, "Please input your article text"]
    },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authorName: String,

    upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },

  {
    timestamps: true
  }
);

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
