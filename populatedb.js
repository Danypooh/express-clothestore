#! /usr/bin/env node

console.log(
  'This script populates some test clothes, brands, clotheTypes, categories, and clotheInstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Categorie = require("./models/categorie");
const ClotheInstance = require("./models/clotheinstance");
const ClotheType = require("./models/clothetype");
const Clothe = require("./models/clothe");

const brands = [];
const categories = [];
const clotheInstances = [];
const clotheTypes = [];
const clothes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrands();
  await createCategories();
  await createClotheTypes();
  await createClothes();
  await createClotheInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// brand[0] will always be the Nike brand, regardless of the order
// in which the elements of promise.all's argument complete.
async function brandCreate(index, name) {
  const brand = new Brand({ name: name });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function categorieCreate(index, name) {
  const categorie = new Categorie({ name: name });
  await categorie.save();
  categories[index] = categorie;
  console.log(`Added categorie: ${name}`);
}

async function clotheInstanceCreate(index, clothe, status) {
  const clotheInstanceDetail = {
    clothe: clothe,
  };
  if (status != false) clotheInstanceDetail.status = status;

  const clotheInstance = new ClotheInstance(clotheInstanceDetail);
  await clotheInstance.save();
  clotheInstances[index] = clotheInstance;
  console.log(`Added clotheInstance: ${clothe}`);
}

async function clotheTypeCreate(index, name) {
  const clotheType = new ClotheType({ name: name });
  await clotheType.save();
  clotheTypes[index] = clotheType;
  console.log(`Added clotheType: ${name}`);
}

async function clotheCreate(
  index,
  name,
  brand,
  description,
  clotheType,
  price,
  categorie
) {
  const clotheDetail = {
    name: name,
    description: description,
    clotheType: clotheType,
    price: price,
  };
  if (brand != false) clotheDetail.brand = brand;
  if (categorie != false) clotheDetail.categorie = categorie;

  const clothe = new Clothe(clotheDetail);
  await clothe.save();
  clothes[index] = clothe;
  console.log(`Added clothe: ${name}`);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Addidas"),
    brandCreate(1, "Nike"),
    brandCreate(2, "Zara"),
    brandCreate(3, "Gucci"),
    brandCreate(4, "Calvin Klein"),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categorieCreate(0, "Men"),
    categorieCreate(1, "Women"),
    categorieCreate(2, "Kids"),
  ]);
}

async function createClotheInstances() {
  console.log("Adding clothe instances");
  await Promise.all([
    clotheInstanceCreate(0, clothes[0], "Available"),
    clotheInstanceCreate(1, clothes[0], "Available"),
    clotheInstanceCreate(2, clothes[1], "Out of Stock"),
    clotheInstanceCreate(3, clothes[2], false),
    clotheInstanceCreate(4, clothes[3], "On Sale"),
    clotheInstanceCreate(5, clothes[4], "Pre-Order"),
  ]);
}

async function createClotheTypes() {
  console.log("Adding clothe types");
  await Promise.all([
    clotheTypeCreate(0, "Tops"),
    clotheTypeCreate(1, "Bottoms"),
    clotheTypeCreate(2, "Shoes"),
    clotheTypeCreate(3, "Accessories"),
    clotheTypeCreate(4, "Underwear"),
  ]);
}

async function createClothes() {
  console.log("Adding clothes");
  await Promise.all([
    clotheCreate(
      0,
      "Papu T-shirt",
      brands[0],
      "The papuiest shirt in the market",
      clotheTypes[0],
      24.99,
      categories[0]
    ),
    clotheCreate(
      1,
      "Papu Shorts",
      brands[1],
      "The papuiest shorts in the market",
      clotheTypes[1],
      24.99,
      categories[0]
    ),
    clotheCreate(
      2,
      "Pericos Hat",
      brands[2],
      "Lets Go Pericooooos",
      clotheTypes[3],
      14.99,
      categories[2]
    ),
    clotheCreate(
      3,
      "Botitas",
      brands[3],
      "Botitas putiadas",
      clotheTypes[2],
      1.99,
      categories[0]
    ),
    clotheCreate(
      4,
      "Hello Kitty socks",
      brands[4],
      "Made with real kitties...just kidding",
      clotheTypes[4],
      4.99,
      categories[1]
    ),
    clotheCreate(
      5,
      "PowerGirl Skirt",
      brands[4],
      "The item gives you the ability to fly",
      clotheTypes[1],
      99.99,
      categories[1]
    ),
  ]);
}
