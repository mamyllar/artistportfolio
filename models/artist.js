"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var artistSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gallery: [{ type: Schema.Types.ObjectId, ref: "Gallery" }],
  },
  {
    timestamps: true,
  }
);

artistSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

artistSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("Artist", artistSchema);
