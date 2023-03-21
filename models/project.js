const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project: Array
});

module.exports = mongoose.model('Project', projectSchema);