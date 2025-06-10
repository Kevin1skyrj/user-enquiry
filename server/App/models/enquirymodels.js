let mongoose = require("mongoose");

let enquirySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    
        
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
    
});
let enquiryModel = mongoose.model("enquiry", enquirySchema);

module.exports = enquiryModel
