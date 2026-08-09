const { taskModel } = require("../models/task.model");
const mongoose = require('mongoose')

/**
 * API - '/api/user/task'
 * @requires Title , Description
 */
exports.addTask = (req,res) => {
    const userId = req.user.id;
    const { title, description } = req.body;

    try {
        if(!title || !description) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required'
            })
        };
        const userTask = new taskModel({
            title,
            description,
            userId
        })
        
        userTask.save();

        // send the response 
        return res.status(201).json({
            success: true,
            message: 'Task saved',
            userTask
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

/**
 * API - 'api/user/task/:id'
 */
exports.updateUserTask = async (req,res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    try {
        const updatedUserTaskDetails = req.body;
        
        // fetch the user task
        const updatedTask = await taskModel.findByIdAndUpdate({
            _id: taskId,
            userId
            },
            updatedUserTaskDetails
            )

        // check user is exit or not
        if(!updatedTask) {
            return res.status(500).json({
                success: true,
                message: 'User task not found'
            })
        };

        return res.status(201).json({
            success: true,
            message: "Task updated Successfully",
            updatedTask
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

/**
 * API - 'api/user/task/:id'
 */
exports.deleteUserTask = async (req,res) => {
    // get the userId and TaskId from req
    const taskId = req.params.id;
    const userId = req.user.id;

    try {
        const userTask = await taskModel.findByIdAndDelete({
            _id: taskId,
            userId
            })
        // check user task 
        if(!userTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'task deleted'
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

/**
 * API - 'api/user/tasks'
 */
exports.userAllTasks = async (req, res) => {
    const userId = req.user.id;
    const date = req.params.date;  

    try {
        const tasks = await taskModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            }
        ],
        { filterDate: date });  

        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// get user task

exports.getUserTask = async (req,res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    try {
        const isTaskFound = await taskModel.findOne({
            _id : taskId,
            userId
        })
        // Chck user is found in database
        if(!isTaskFound) {
            res.status(404).json({
                success: false,
                message: 'User not Found'
            })
        }
        return res.status(200).json({
            success: true,
            isTaskFound
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

