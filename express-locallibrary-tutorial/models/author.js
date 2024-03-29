var moment = require('moment')
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_birth ? moment(this.date_of_birth).format('Do MMM YYYY') : '') + ' - ' + (this.date_of_death ? moment(this.date_of_death).format('Do MMM YYYY') : '');
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
