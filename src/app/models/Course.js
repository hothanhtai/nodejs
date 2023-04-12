const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: String, maxLength: 250 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, maxLength: 255 },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
  );
  
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{overrideMethods: 'all', deletedAt: true});
module.exports = mongoose.model("Course", Course);
