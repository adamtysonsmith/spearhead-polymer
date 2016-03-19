'use strict';
const PrivateController = require('../controllers/private');

// Authenticated Routes
module.exports = app => {
  app.get('/dashboard', PrivateController.app);
  app.get('/projects', PrivateController.app);
}

// Old Authenticated API Routes
//app.get('/api/projects', apiController.readProject);

//app.post('/api/projects', apiController.createProject);
//app.post('/api/projects/:id/stages', apiController.createStage);
//app.post('/api/projects/:id/stages/:stageid/tasks', apiController.createTask);
//app.post('/api/projects/:id/stages/:stageid/tasks/:taskid/notes', apiController.createNote);
//app.post('/api/projects/:id/stages/:stageid/tasks/:taskid', apiController.checkTask)
//
//app.delete('/api/projects/:id/stages/:stageid/tasks/:taskid', apiController.deleteTask);
//app.delete('/api/projects/:id/stages/:stageid/tasks/:taskid/notes/:noteid', apiController.deleteNote);