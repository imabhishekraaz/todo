const mongoose = require('mongoose');
const { taskModel } = require("../models/task.model");

exports.filterByDateAggregate = function () {
    const options = this.options;

    const dateInput = options.filterDate || new Date().toISOString().split('T')[0];

    const startOfDay = new Date(`${dateInput}T00:00:00.000Z`);
    const endOfDay = new Date(`${dateInput}T23:59:59.999Z`);

    this.pipeline().unshift({
        $match: {
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }
    });
};
