const mongoose = require("mongoose");

const RoomDataSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    pressure: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    gas_resistance: {
        type: Number,
        required: true,
    }
});

const RoomData = mongoose.model("RoomData", RoomDataSchema);

module.exports = RoomData;
