const locationModel = require("../../../DB/models/locations");
const locationSchema = require("../../../DB/models/locations");
const { catchError } = require("../../middlewares/catchError");
const apiError = require("../../utils/apiError");



const addLocation = catchError(async(req,res,next)=>{
    let location = await locationModel.create(req.body);
    res.json({msg: "success" , location});
})

const getLocations = catchError(async(req,res,next)=>{
    let locations = await locationModel.findAll({
        attributes: ["name"]
    })
    res.json({msg: "success", locations});
})

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