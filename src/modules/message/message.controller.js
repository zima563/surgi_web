const messageModel = require("../../../DB/models/message.model");
const { catchError } = require("../../middlewares/catchError");


const addMessage = catchError(async (req, res, next) => {
    let message = await messageModel.create(req.body);
    res.json(message);
});

const getAllMessage = catchError(async (req, res, next) => {
    let messages = await messageModel.findAll();
    res.json(messages)
});

module.exports = {
    addMessage,
    getAllMessage
}