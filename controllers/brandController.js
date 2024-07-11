const Brand = require("../models/brand");
const Clothe = require("../models/clothe");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.brandList = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();
  res.render("brand_list", {
    title: "Brand List",
    brand_list: allBrands,
  });
});

exports.brandDetail = asyncHandler(async (req, res, next) => {
  // Get details of brand and all their clothes (in parallel)
  const [brand, allClothesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Clothe.find({ brand: req.params.id }, "clothe summary")
      .select("name description clotheType price categorie url")
      .populate("clotheType")
      .populate("categorie")
      .exec(),
  ]);

  if (brand === null) {
    // No results.
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  console.log(allClothesByBrand);

  res.render("brand_detail", {
    title: "Brand Detail",
    brand: brand,
    brand_clothes: allClothesByBrand,
  });
});

exports.brandCreateGet = asyncHandler(async (req, res, next) => {
  res.render("brand_form", { title: "Create Author" });
});

exports.brandCreatePost = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    //Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Brand object with escaped and trimmed data
    const brand = new Brand({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("brand_form", {
        title: "Create Brand",
        brand: brand,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save Brand.
      await brand.save();
      // Redirect to new brand record.
      res.redirect(brand.url);
    }
  }),
];

exports.brandDeleteGet = asyncHandler(async (req, res, next) => {
  // Get details of brand and all their clothes (in parallel)
  const [brand, allClothesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Clothe.find({ brand: req.params.id }, "clothe summary")
      .select("name description")
      .exec(),
  ]);

  if (brand === null) {
    // No results.
    res.redirect("/catalog/brands");
  }

  res.render("brand_delete", {
    title: "Delete Brand",
    brand: brand,
    brand_clothes: allClothesByBrand,
  });
});

exports.brandDeletePost = asyncHandler(async (req, res, next) => {
  // Get details of brand and all their clothes (in parallel)
  const [brand, allClothesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Clothe.find({ brand: req.params.id }, "clothe summary")
      .select("name description")
      .exec(),
  ]);

  if (allClothesByBrand.length > 0) {
    // Brand has clothes. Render in same way as for GET route.
    res.render("brand_delete", {
      title: "Delete brand",
      brand: brand,
      brand_clothes: allClothesByBrand,
    });
    return;
  } else {
    // Brand has no clothes. Delete object and redirect to the list of brands.
    await Brand.findByIdAndDelete(req.body.brandid);
    res.redirect("/catalog/brands");
  }
});

const debug = require("debug")("author");

exports.brandUpdateGet = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();
  if (brand === null) {
    // No results.
    debug(`id not found on update: ${req.params.id}`);
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  res.render("brand_form", { title: "Update Brand", brand: brand });
});

exports.brandUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Brand update POST");
});
