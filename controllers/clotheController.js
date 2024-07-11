const Clothe = require("../models/clothe");
const Brand = require("../models/brand");
const Categorie = require("../models/categorie");
const ClotheInstance = require("../models/clothe-instance");
const ClotheType = require("../models/clothe-type");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of clothes, clothe instances, clothe availability, clothe types, categories and brands counts (in parallel)
  const [
    numClothes,
    numClotheInstances,
    numAvailableClotheInstances,
    numClotheTypes,
    numCategories,
    numBrands,
  ] = await Promise.all([
    Clothe.countDocuments({}).exec(),
    ClotheInstance.countDocuments({}).exec(),
    ClotheInstance.countDocuments({ status: "Available" }).exec(),
    ClotheType.countDocuments({}).exec(),
    Categorie.countDocuments({}).exec(),
    Brand.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Clothe Store Home",
    clothe_count: numClothes,
    clothe_instance_count: numClotheInstances,
    clothe_instance_available_count: numAvailableClotheInstances,
    clothe_type_count: numClotheTypes,
    categorie_count: numCategories,
    brand_count: numBrands,
  });
});

exports.clotheList = asyncHandler(async (req, res, next) => {});

exports.clotheDetail = asyncHandler(async (req, res, next) => {});

exports.clotheCreateGet = asyncHandler(async (req, res, next) => {});

exports.clotheCreatePost = asyncHandler(async (req, res, next) => {});

exports.clotheDeleteGet = asyncHandler(async (req, res, next) => {});

exports.clotheDeletePost = asyncHandler(async (req, res, next) => {});

exports.clotheUpdateGet = asyncHandler(async (req, res, next) => {});

exports.clotheUpdatePost = asyncHandler(async (req, res, next) => {});
