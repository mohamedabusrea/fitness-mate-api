const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
                                _id: Number,
                                name: {
                                  type: String,
                                  required: 'Kindly enter the name of the task',
                                },
                                Created_date: {
                                  type: Date,
                                  default: Date.now,
                                },
                                status: {
                                  type: [
                                    {
                                      type: String,
                                      enum: ['pending', 'ongoing', 'completed'],
                                    },
                                  ],
                                  default: ['pending'],
                                },
                              }, {_id: false});

module.exports = mongoose.model('Users', TaskSchema);
