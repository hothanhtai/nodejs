const Course = require("../models/Course");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");

class CourseController {
  //[GET] /Course/:slug
  show(req, res, next) {
    Course.findOne({
      slug: req.params.slug,
    })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /course/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /course/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg`;
    const course = new Course(formData);
    course.save();

    res.redirect("/");
  }

  //[GET] courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  //[PUT] coureses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  //[GET] coureses/cart
  checkout(req, res, next) {
    Course.findOne({
      slug: req.params.slug,
    })
      .then((course) =>
        res.render("courses/checkout", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  //[DELETE] /courses/:id
  delete(req,res, next){
      Course.delete({_id:req.params.id})
        .then(() => res.redirect('back')) 
        .catch(next);
  }
  
  //[DELETE] /courses/:id/force
  forceDelete(req,res, next){
    Course.deleteOne({_id:req.params.id})
      .then(() => res.redirect('back')) 
      .catch(next);
}

  //[PATCH] /courses/:id/restore
  restore(req,res, next){
    Course.restore({_id:req.params.id})
    .then(() => res.redirect('back')) 
    .catch(next);
  }

  //[POST] /courses/handle-form-action
  handleFormActions(req, res, next){
      switch(req.body.action){
        case 'delete':
          Course.delete({_id: { $in: req.body.courseIds}})
            .then(() => res.redirect('back')) 
            .catch(next);
          break;
        default:
          res.json({message: 'Invalid action'})
      }
  }

  handleFormRestoreActions(req, res, next) {
    switch(req.body.action){
      case 'PermanentlyDeleted':
        Course.deleteOne({_id:{ $in: req.body.courseIds}})
          .then(() => res.redirect('back')) 
          .catch(next);
        break;
      
      case 'restore':
        Course.restore({_id:{ $in: req.body.courseIds}})
          .then(() => res.redirect('back')) 
          .catch(next);
        break;
      default:
        res.json({message: 'Invalid action'})
    }
  }

}

module.exports = new CourseController();
