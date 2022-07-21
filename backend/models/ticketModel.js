const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    //   Link theticket user with the registerd user opening the ticket
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter name"],
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "Macbook Pro", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description of issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
