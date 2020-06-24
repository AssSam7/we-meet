const Post = require("../models/Post");

exports.viewCreateScreen = function (req, res) {
  res.render("create-post");
};

exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id);
  post
    .create()
    .then(function () {
      res.send("New post created");
    })
    .catch(function (errors) {
      res.send(errors);
    });
};

exports.viewSingle = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.render("single-post-screen", { post: post });
  } catch (err) {
    res.render("404");
  }
};

exports.viewEditScreen = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id);
    res.render("edit-post", { post: post });
  } catch {
    res.render("404");
  }
};

exports.edit = function (req, res) {
  let post = new Post(req.body, req.visitorId, req.params.id);
  post
    .update()
    .then((status) => {
      // The post was successfully updated in the database
      // or user did have permission, but did some validation error
      if (status == "success") {
        // The post was updated successfully in the database
        req.flash("success", "Post successfully updated");
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      } else {
        post.errors.forEach((err) => {
          req.flash("errors", err);
          req.session.save(function () {
            res.redirect(`/post/${req.params.id}/edit`);
          });
        });
      }
    })
    .catch(() => {
      // A post with request id doesn't exist
      // or if the current visitor is not the owner of the requested post
      req.flash("errors", "You do not have permission to perform that action");
      req.session.save("/", function () {
        res.redirect("/");
      });
    });
};
