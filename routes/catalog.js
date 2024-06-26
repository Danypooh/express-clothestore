const express = require("express");
const router = express.Router();

// Require controller modules
const brandController = require("../controllers/brandController");
const categorieController = require("../controllers/categorieController");
const clotheController = require("../controllers/clotheController");
const clotheInstanceController = require("../controllers/clotheInstanceController");
const clotheTypeController = require("../controllers/clotheTypeController");

/// CLOTHE ROUTES ///

// GET catalog home page
router.get("/", clotheController.index);

// GET request for creating a Clothe. NOTE This must come before routes that display Book (uses id)
router.get("/clothe/create", clotheController.clotheCreateGet);

// POST request for creating Clothe
router.post("/clothe/create", clotheController.clotheCreatePost);

// GET request to delete Clothe
router.get("/clothe/:id/delete", clotheController.clotheDeleteGet);

// POST request to delete Clothe
router.post("/clothe/:id/delete", clotheController.clotheDeletePost);

// GET request to update Clothe
router.get("/clothe/:id/update", clotheController.clotheUpdateGet);

// POST request to update Clothe
router.post("/clothe/:id/update", clotheController.clotheUpdatePost);

// GET request for one Clothe
router.get("/clothe/:id", clotheController.clotheDetail);

// GET request for list of all Clothes
router.get("/clothes", clotheController.clotheList);

/// BRAND ROUTES ///

//GET request for creating a Brand. NOTE This must come before route for id (i.e. display brand)
router.get("/brand/create", brandController.brandCreateGet);

router.post("/brand/create", brandController.brandCreatePost);

router.get("brand/:id/delete", brandController.brandDeleteGet);

router.post("brand/:id/delete", brandController.brandDeletePost);

router.get("brand/:id/update", brandController.brandUpdateGet);

router.post("brand/:id/update", brandController.brandUpdatePost);

router.get("brand/:id", brandController.brandDetail);

router.get("brands", brandController.brandList);

/// CATEGORIE ROUTES ///

//GET request for creating a Categorie. NOTE This must come before route for id (i.e display categorie)
router.get("categorie/create", categorieController.categorieCreateGet);

router.post("categorie/create", categorieController.categorieCreatePost);

router.get("categorie/:id/delete", categorieController.categorieDeleteGet);

router.post("categorie/:id/delete", categorieController.categorieDeletePost);

router.get("categorie/:id/update", categorieController.categorieUpdateGet);

router.post("categorie/:id/update", categorieController.categorieUpdatepost);

router.get("categorie/:id", categorieController.categorieDetail);

router.get("categories", categorieController.categorieList);

/// CLOTHE INSTANCE ROUTES ///

//GET request for creating a Clothe Instance. NOTE This must come before route for id (i.e display clothe instance)
router.get(
  "clothe-instance/create",
  clotheInstanceController.clotheInstanceCreateGet
);

router.post(
  "clothe-instance/create",
  clotheInstanceController.clotheInstanceCreatePost
);

router.get(
  "clothe-instance/:id/delete",
  clotheInstanceController.clotheInstanceDeleteGet
);

router.post(
  "clothe-instance/:id/delete",
  clotheInstanceController.clotheInstanceDeletePost
);

router.get(
  "clothe-instance/:id/update",
  clotheInstanceController.clotheInstanceUpdateGet
);

router.post(
  "clothe-instance/:id/update",
  clotheInstanceController.clotheInstanceUpdatePost
);

router.get(
  "clothe-instance/:id",
  clotheInstanceController.clotheInstanceDetail
);

router.get("clothe-instances", clotheInstanceController.clotheInstanceList);

/// CLOTHE TYPE ROUTES ///

//GET request for creating a Clothe Type. NOTE This must come before route for id (i.e display clothe type)
router.get("clothe-type/create", clotheTypeController.clotheTypeCreateGet);

router.post("clothe-type/create", clotheTypeController.clotheTypeCreatePost);

router.get("clothe-type/:id/delete", clotheTypeController.clotheTypeDeleteGet);

router.post(
  "clothe-type/:id/delete",
  clotheTypeController.clotheTypeDeletePost
);

router.get("clothe-type/:id/update", clotheTypeController.clotheTypeUpdateGet);

router.post(
  "clothe-type/:id/update",
  clotheTypeController.clotheTypeUpdatePost
);

router.get("clothe-type/:id", clotheTypeController.clotheTypeDetail);

router.get("clothe-types", clotheTypeController.clotheTypeList);
