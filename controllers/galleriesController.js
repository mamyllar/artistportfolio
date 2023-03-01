"use strict";

const Gallery = require("../models/gallery"),
  httpStatus = require("http-status-codes"),
//  Artist = require("../models/artist"),
  getGalleryParams = body => {
    return {
      title: body.title,
      description: body.description,
      owner: body.owner,
    };
  };

module.exports = {
  index: (req, res, next) => {
    Gallery.find()
      .then(galleries => {
        res.locals.galleries = galleries;
        next();
      })
      .catch(error => {
        console.log(`Error fetching galleries: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("galleries/index");
  },

  new: (req, res) => {
    res.render("galleries/new");
  },

  create: (req, res, next) => {
    let galleryParams = getGalleryParams(req.body);
    Gallery.create(galleryParams)
      .then(gallery => {
        res.locals.redirect = "/galleries";
        res.locals.gallery = gallery;
        next();
      })
      .catch(error => {
        console.log(`Error saving gallery: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let galleryId = req.params.id;
    Gallery.findById(galleryId)
      .then(gallery => {
        res.locals.gallery = gallery;
        next();
      })
      .catch(error => {
        console.log(`Error fetching gallery by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("galleries/show");
  },

  edit: (req, res, next) => {
    let galleryId = req.params.id;
    Gallery.findById(galleryId)
      .then(gallery => {
        res.render("galleries/edit", {
          gallery: gallery
        });
      })
      .catch(error => {
        console.log(`Error fetching gallery by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let galleryId = req.params.id,
      galleryParams = getGalleryParams(req.body);

    Gallery.findByIdAndUpdate(galleryId, {
      $set: galleryParams
    })
      .then(gallery => {
        res.locals.redirect = `/galleries/${galleryId}`;
        res.locals.gallery = gallery;
        next();
      })
      .catch(error => {
        console.log(`Error updating gallery by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let galleryId = req.params.id;
    Gallery.findByIdAndRemove(galleryId)
      .then(() => {
        res.locals.redirect = "/galleries";
        next();
      })
      .catch(error => {
        console.log(`Error deleting gallery by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  filterArtistGalleries: (req, res, next) => {
    let currentArtist = res.locals.currentArtist;
    if (currentArtist) {
      let mappedGalleries = res.locals.galleries.map(gallery => {
        let artistJoined = currentArtist.galleries.some(artistGallery => {
          return artistGallery.equals(gallery._id);
        });
        return Object.assign(gallery.toObject(), { joined: artistJoined });
      });
      res.locals.galleries = mappedGalleries;
      next();
    } else {
      next();
    }
  },
  join: (req, res, next) => {
    let galleryId = req.params.id,
      currentArtist = req.artist;
    if (currentArtist) {
      Artist.findByIdAndUpdate(currentArtist, {
        $addToSet: {
          galleries: galleryId
        }
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("Artist must log in."));
    }
  }
};