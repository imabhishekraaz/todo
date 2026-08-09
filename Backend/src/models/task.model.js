const mongoose = require('mongoose');
const taskMiddleware = require('./../middleware/task.middleware')

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: Boolean,
        default: false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

taskSchema.pre('aggregate', taskMiddleware.filterByDateAggregate);


exports.taskModel = mongoose.model('task',taskSchema);