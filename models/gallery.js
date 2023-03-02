"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Gallery", gallerySchema);
