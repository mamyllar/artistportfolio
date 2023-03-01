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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
