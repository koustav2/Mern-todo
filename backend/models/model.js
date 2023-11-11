const mongoose = require('mongoose');


const toDOSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ToDo= mongoose.model('ToDo', toDOSchema);

module.exports = ToDo;