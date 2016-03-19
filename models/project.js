'use strict';
const mongoose = require('mongoose');

const noteSchema = {
    content: String,
    timestamp: { type: Date, default: Date.now() }
}

const taskSchema = {
  content: String,
  isCompleted: { type: Boolean, default: false },
  isDeferred:  { type: Boolean, default: false },
  notes: [noteSchema]
}
    
const stageSchema = { 
  name: String,
  startDate:   { type: String, default: undefined },
  isStarted:   { type: Boolean, default: false },
  isActive:    { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  isDeferred:  { type: Boolean, default: false },
  tasks: [taskSchema]
}

const projectSchema = mongoose.Schema({
    name: String,
    startDate: String,
    dueDate: String,
    isStarted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isAbandoned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    stages: [stageSchema]
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;