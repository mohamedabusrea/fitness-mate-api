const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
                                _id: String,
                                displayName: {type: String, trim: true},
                                userName: {type: String, trim: true},
                                email: {type: String, trim: true},
                                image: {type: String, trim: true},
                                routines: Schema.Types.Mixed,
                                workouts: Schema.Types.Mixed,
                                exercises: Schema.Types.Mixed,
                                settings: Schema.Types.Mixed,
                                timestamp: Schema.Types.Mixed,
                                metrics: Schema.Types.Mixed,
                                /*name: {
                                 type: String,
                                 required: 'Kindly enter the name of the task',
                                 },*/
                              }, {_id: false});

module.exports = mongoose.model('Users', UserSchema);
