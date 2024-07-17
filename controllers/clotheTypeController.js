const ClotheType = require("../models/clothe-type");
const Clothe = require("../models/clothe");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.clotheTypeList = asyncHandler(async (req, res, next) => {
  const allClotheTypes = await ClotheType.find().sort({ name: 1 }).exec();
  res.render("clotheType_list", {
    title: "Clothe Type List",
    clothe_type_list: allClotheTypes,
  });
});

exports.clotheTypeDetail = asyncHandler(async (req, res, next) => {
  const [clotheType, allClothesByClotheType] = await Promise.all([
    ClotheType.findById(req.params.id).exec(),
    Clothe.find({ clotheType: req.params.id }, "clothe summary")
      .select("name brand description price categorie url")
      .populate("brand")
      .populate("categorie")
      .exec(),
  ]);

  if (clotheType === null) {
    const err = new Error("Clothe Type not found");
    err.status = 404;
    return next(err);
  }

  res.render("clotheType_detail", {
    title: "Clothe Type Detail",
    clothe_type: clotheType,
    clothe_type_clothes: allClothesByClotheType,
  });
});

exports.clotheTypeCreateGet = asyncHandler(async (req, res, next) => {
  res.render("clotheType_form", { title: "Create Clothe Type" });
});

exports.clotheTypeCreatePost = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const clotheType = new ClotheType({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("clotheType_form", {
        title: "Create Clothe Type",
        clothe_type: clotheType,
        errors: errors.array(),
      });
      return;
    } else {
      await clotheType.save();
      res.redirect(clotheType.url);
    }
  }),
];

exports.clotheTypeDeleteGet = asyncHandler(async (req, res, next) => {
  const [clotheType, allClothesByClotheType] = await Promise.all([
    ClotheType.findById(req.params.id).exec(),
    Clothe.find({ clotheType: req.params.id }, "clothe summary")
      .select("name description")
      .exec(),
  ]);

  if (clotheType === null) {
    res.redirect("/catalog/clothe-types");
  }

  res.render("clotheType_delete", {
    title: "Delete Clothe Type",
    clothe_type: clotheType,
    clothe_type_clothes: allClothesByClotheType,
  });
});

exports.clotheTypeDeletePost = asyncHandler(async (req, res, next) => {
  const [clotheType, allClothesByClotheType] = await Promise.all([
    ClotheType.findById(req.params.id).exec(),
    Clothe.find({ clotheType: req.params.id }, "clothe summary")
      .select("name description")
      .exec(),
  ]);

  if (allClothesByClotheType.length > 0) {
    res.render("clotheType_delete", {
      title: "Delete clothe type",
      clothe_type: clotheType,
      clothe_type_clothes: allClothesByClotheType,
    });
    return;
  } else {
    await ClotheType.findByIdAndDelete(req.body.clothetypeid);
    res.redirect("/catalog/clothe-type");
  }
});

const debug = require("debug")("author");

exports.clotheTypeUpdateGet = asyncHandler(async (req, res, next) => {
  const clotheType = await ClotheType.findById(req.params.id).exec();
  if (clotheType === null) {
    debug(`id not found on update: ${req.params.id}`);
    const err = new Error("Clothe Type not found");
    err.status = 404;
    return next(err);
  }

  res.render("clotheType_form", {
    title: "Update Clothe Type",
    clothe_type: clotheType,
  });
});

exports.clotheTypeUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Clothe Type update POST");
});
