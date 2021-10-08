const featureRepository = require("../repository/featureRepository");
const ratingRepository = require("../repository/ratingRepository");
const systemRepository = require("../repository/systemRepository");
const { ErrorObj, ErrorCode } = require('../config/errorObj');

module.exports =
{
    async reporting(request, response)
    {
        try 
        {
            const features = await featureRepository.getAllFeatures();
            const systems = await systemRepository.getAllSystems();
            const ratings = await ratingRepository.getAllRating();

            if(ratings == null || ratings.length == 0)
                  return response.status(204).json([]);

            // const promiseFeatures = featureRepository.getAllFeatures();
            // const promiseSystems = systemRepository.getAllSystems();
            // const [ratings, systems, features]= Promise.all([ratingRepository.getAllRating(),systemRepository.getAllSystems(), featureRepository.getAllFeatures() ]);

            var reportData = ratings.map (function(rating) 
            {
                var feature =  features.filter(function(x) { return x.id == rating.featureId; })[0];

                return {
                    featureName : feature.name,
                    systemId : feature.systemId,
                    systemName:  systems.filter(function(x) { return x.id == feature.systemId; })[0].name,
                    featureVersion: rating.featureVersion,
                    featureId: rating.featureId,
                    comment: rating.comment,
                    ratingValue: rating.ratingValue,
                    username: rating.username,
                    userId: rating.userId,
                    created: rating.created
                };
            });

            return response.json(reportData);
        } 
        catch (e) 
        {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    }
}