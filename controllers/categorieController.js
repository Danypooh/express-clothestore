const Categorie = require("../models/categorie");
const Clothe = require("../models/clothe");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.categorieList = asyncHandler(async (req, res, next) => {
  const allCategories = await Categorie.find().sort({ name: 1 }).exec();
  res.render("categorie_list", {
    title: "Categorie List",
    categorie_list: allCategories,
  });
});

exports.categorieDetail = asyncHandler(async (req, res, next) => {
  const [categorie, allClothesByCategorie] = await Promise.all([
    Categorie.findById(req.params.id).exec(),
    Clothe.find({ categorie: req.params.id }, "clothe summary")
      .select("name description clotheType price url")
      .populate("clotheType")
      .exec(),
  ]);

  if (categorie === null) {
    //No results
    const err = new Error("Categorie not found");
    err.status = 404;
    return next(err);
  }

  res.render("categorie_detail", {
    title: "Categorie Detail",
    categorie: categorie,
    categorie_clothes: allClothesByCategorie,
  });
});

exports.categorieCreateGet = asyncHandler(async (req, res, next) => {
  res.render("categorie_form", { title: "Create Categorie" });
});

exports.categorieCreatePost = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    //Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Categorie object with escaped and trimmed data
    const categorie = new Categorie({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("categorie_form", {
        title: "Create Categorie",
        categorie: categorie,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form form is valid.

      // Save Categorie.
      await categorie.save();
      // Redirect to new categorie record
      res.redirect(categorie.url);
    }
  }),
];

exports.categorieDeleteGet = asyncHandler(async (req, res, next) => {
  const [categorie, allClothesByCategorie] = await Promise.all([
    Categorie.findById(req.params.id).exec(),
    Clothe.find({ categorie: req.params.id }, "clothe summary")
      .select("name description")
      .exec(),
  ]);

  if (categorie === null) {
    //No results.
    res.redirect("/catalog/brands");
  }

  res.render("categorie_delete", {
    title: "Delete Categorie",
    categorie: categorie,
    categorie_clothes: allClothesByCategorie,
  });
});

exports.categorieDeletePost = asyncHandler(async (req, res, next) => {
  const [categorie, allClothesByCategorie] = await Promise.all([
    Categorie.findById(req.params.id).exec(),
    Clothe.find({ categorie: req.params.id })
      .select("brand description")
      .exec(),
  ]);

  if (allClothesByCategorie.length > 0) {
    // Categorie has clothes. Render in same way as for GET route
    res.render("categorie_delete", {
      title: "Delete Categorie",
      categorie: categorie,
      categorie_clothes: allClothesByCategorie,
    });
    return;
  } else {
    // Categorie has no clothes. Delete object and redirect to the list of brands.
    await Brand.findByIdAndDelete(req.body.categorieid);
    res.redirect("/catalog/categories");
  }
});

exports.categorieUpdateGet = asyncHandler(async (req, res, next) => {
  const categorie = await Categorie.findById(req.params.id).exec();
  if (categorie === null) {
    // No results
    debug(`id not found on update: ${req.params.id}`);
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  res.render("categorie_form", {
    title: "Update Categorie",
    categorie: categorie,
  });
});

exports.categorieUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Brand update POST");
});
