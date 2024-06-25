const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.MONGO_URI);
// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("could not connect to mongdb", err.message));

// Define the Person schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create the Person model
const Person = mongoose.model("Person", personSchema);

//   Create and Save a Record of a Model:
const addPerson = async () => {
  try {
    const person = new Person({
      name: "jhon",
      age: 30,
      favoriteFoods: ["pasta", "burger", "snackess"],
    });
    const result = await person.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
// addPerson();
// Create Many Records with model.create()
const addManyPeople = async () => {
  try {
    const result = await Person.create([
      { name: "jane", age: 35, favoriteFoods: ["riz", "salad", "chicken"] },
      { name: "sam", age: 40, favoriteFoods: ["pizza", "fish", "seafood"] },
      { name: "david", age: 20, favoriteFoods: ["potato", "cake", "lamp"] },
    ]);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
// addManyPeople();
// Use model.find() to Search Your Database
const findPeople = async () => {
  try {
    const people = await Person.find({
      name: "x",
    });
    console.log(people);
  } catch (error) {
    console.log(error.message);
  }
};
// findPeople();
// Use model.findOne() to Return a Single Matching Document from Your Database

const findeOnePerson = async () => {
  try {
    const person = await Person.findOne({
      favoriteFoods: "riz",
    });
    console.log(person);
  } catch (error) {
    console.log(error.message);
  }
};
// findeOnePerson();
// Use model.findById() to Search Your Database By _id

const findPersonById = async () => {
  try {
    const person = await Person.findById("667412400650c66b7b3ed72c");
    console.log(person);
  } catch (error) {
    console.log(error.message);
  }
};
// findPersonById();
// Perform Classic Updates by Running Find, Edit, then Save

const updatePerson = async () => {
  try {
    // find by ID
    const person = await Person.findById("667412400650c66b7b3ed72c");
    //    edit
    person.favoriteFoods.push("Hamburger");
    // save
    const result = await person.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
// updatePerson();

// Perform New Updates on a Document Using model.findOneAndUpdate()

const personName = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      {
        name: "David",
      },
      { age: 20 },
      { new: true }
    );

    console.log(person);
  } catch (error) {
    console.log(error.message);
  }
};
// personName();
// Delete One Document Using model.findByIdAndRemove
const removePerson = async (personId) => {
  try {
    const person = await Person.findByIdAndDelete({ _id: personId });
    console.log(person);
  } catch (error) {
    console.log(error.message);
  }
};
// removePerson("667412400650c66b7b3ed72c");

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removePeople = async () => {
  try {
    const person = await Person.deleteMany({ name: "sam" });
    console.log(person);
  } catch (error) {
    console.log(error.message);
  }
};
// removePeople();
// Chain Search Query Helpers to Narrow Search Results
const searchFood = async () => {
  try {
    const person = await Person.find({ favoriteFoods: "pasta" })
      .sort({ name: 1 })
      .limit(1)
      .select("-age");
    console.log(person);
  } catch (error) {
    console.log(error.message);
  }
};
searchFood();
