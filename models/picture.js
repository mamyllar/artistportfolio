"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const pictureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pic: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Picture", pictureSchema);
