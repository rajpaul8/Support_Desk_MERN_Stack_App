const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a ticket"],
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add text"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
