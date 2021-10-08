const express = require("express");
const routes = express.Router();
const featureService = require("./api/featureService");
const ratingService = require("./api/ratingService");
const reportService = require("./api/reportService");
const authorize = require("./authorize");
const { EnumRoles } = require("./config/enumRoles");
const authorizationService = require("./api/authorizationService");
const { celebrate, Segments, Joi } = require("celebrate");
const authMiddleware = require('./middleware/auth');

routes.post("/authorization", celebrate({
    [Segments.BODY]: Joi.object().keys({
        application: Joi.string().required(),
        password: Joi.string().required(),
        featureId: Joi.number().optional(),
        userId: Joi.string().max(255).optional(),
        username: Joi.string().max(255).optional(),
        featureVersion: Joi.string().max(255).optional(),
        ratingOpenQuestion: Joi.string().optional(),
        ratingQuestion: Joi.string().optional()
    })
}),
    authorizationService.authorization);

routes.use(authMiddleware);

//POST
routes.post("/system", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(255).required(),
        id: Joi.number().optional()
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.createSystem);

//GET
routes.get("/systems", authorize(EnumRoles.ADMINISTRATOR), featureService.getAllSystems);

routes.get("/system/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.getSystemById);

//DELETE
routes.delete("/system/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.deleteSystem);


/* FEATURE */

//POST
routes.post("/feature", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().max(255).required(),
        systemId: Joi.number().required(),
        id: Joi.number().optional()
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.createFeature)

//GET
routes.get("/features",
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.getAllFeatures);

routes.get("/feature/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.getFeatureById);

//DELETE
routes.delete("/feature/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    featureService.deleteFeature);

/* Rating */

//POST
routes.post("/rating", celebrate({
    [Segments.BODY]: Joi.object().keys({
        ratingValue: Joi.string().required(),
        comment: Joi.optional()
    })
}),
    authorize(EnumRoles.APPLICATION),
    ratingService.createRating)

//GET
routes.get("/ratings",
    authorize(EnumRoles.ADMINISTRATOR),
    ratingService.getAllRatings);
routes.get("/rating/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    ratingService.getRatingById);

routes.get("/rating/feature/:featureId", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        featureId: Joi.number().required(),
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    ratingService.getRatingsByFeature);

routes.get("/rating/user/:userId", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(),
    })
}),
    authorize(EnumRoles.APPLICATION),
    ratingService.getRatingsByUserId);

//DELETE
routes.delete("/rating/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),
    authorize(EnumRoles.ADMINISTRATOR),
    ratingService.deleteRating);


/*Reporting*/

routes.get("/reporting",
    authorize(EnumRoles.REPORT),
    reportService.reporting);

module.exports = routes;