const locationModel = require("../../../DB/models/locations");
const locationSchema = require("../../../DB/models/locations");
const { catchError } = require("../../middlewares/catchError");
const apiError = require("../../utils/apiError");
const SequelizeFeatures = require("../../utils/apiFeatures");



const addLocation = catchError(async(req,res,next)=>{
    let location = await locationModel.create(req.body);
    res.json({msg: "success" , location});
})



const getLocations = catchError(async (req, res) => {
    let sequelizeFeatures = new SequelizeFeatures(locationModel, req.query)
      .filter() // Apply filtering criteria
      .sort() // Apply sorting criteria
      .search("locationModel") // Apply search criteria
      .limitedFields(); // Select specific fields to return
  
  
      const { sequelizeQuery } = sequelizeFeatures;
  

    
      let locations = await locationModel.findAll({
      ...sequelizeQuery,
    });
  
    res.json({
      msg: "success",
      locations,
    });
  });

const updateLocation = catchError(async(req,res,next)=>{
    let location = await locationModel.update(req.body,{
        where:{id: req.params.id}
    });
    ! location && next(new apiError(`not location found with id : ${req.params.id}`));
    location && res.json({msg: "location updated successfully"});
})

const deleteLocation = catchError(async(req,res,next)=>{
    let location = await locationModel.destroy({
        where: { id : req.params.id}
    })
    ! location && next(new apiError(`not location found with id : ${req.params.id}`));
    location && res.json({msg: "location deleted successfully"});
})

module.exports = {
    addLocation,
    getLocations,
    updateLocation,
    deleteLocation
}