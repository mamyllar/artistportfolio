"use strict";

const Artist = require("../models/artist"),
  passport = require("passport"),
  getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      email: body.email,
      password: body.password,
    };
  };

module.exports = {
  index: (req, res, next) => {
    Artist.find()
      .then(artists => {
        res.locals.artists = artists;
        next();
      })
      .catch(error => {
        console.log(`Error fetching artists: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("artists/index");
  },

  new: (req, res) => {
    res.render("artists/new");
  },

  create: (req, res, next) => {
    if (req.skip) return next();
    let newartist = new Artist(getUserParams(req.body));
    Artist.register(newartist, req.body.password, (e, artist) => {
      if (artist) {
        res.locals.redirect = "/artists";
        next();
      } else {
        res.locals.redirect = "/artists/new";
        next();
      }
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let artistId = req.params.id;
    Artist.findById(artistId)
      .then(artist => {
        res.locals.artist = artist;
        next();
      })
      .catch(error => {
        console.log(`Error fetching artist by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("artists/show");
  },

  edit: (req, res, next) => {
    let artistId = req.params.id;
    Artist.findById(artistId)
      .then(artist => {
        res.render("artists/edit", {
          artist: artist
        });
      })
      .catch(error => {
        console.log(`Error fetching artist by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let artistId = req.params.id,
      artistParams = getUserParams(req.body);

    Artist.findByIdAndUpdate(artistId, {
      $set: artistParams
    })
      .then(artist => {
        res.locals.redirect = `/artists/${artistId}`;
        res.locals.artist = artist;
        next();
      })
      .catch(error => {
        console.log(`Error updating artist by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let artistId = req.params.id;
    Artist.findByIdAndRemove(artistId)
      .then(() => {
        res.locals.redirect = "/artists";
        next();
      })
      .catch(error => {
        console.log(`Error deleting artist by ID: ${error.message}`);
        next();
      });
  },
  login: (req, res) => {
    res.render("artists/login");
  },
  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("password", "Password cannot be empty").notEmpty();
    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/artists/new";
        next();
      } else {
        next();
      }
    });
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/artists/login",
    successRedirect: "/",
  }),
  logout: function(req, res, next) {
    req.logout(function(err){
    if (err) {return next(err); }
    res.redirect("/");
    });
  }
};