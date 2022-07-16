// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const surveySchema = new Schema
({
  user: String, // user's id
  
  name: String,
  dateCreated:
  {
    type: String,
    default: new Date().toISOString()
  },
  responses:
  {
    type: Number,
    default: 0
  },
  questions: [{
    title: String,
    optionType: String,
    options: [{
      details: String,
      count:{ 
        type: Number, 
        default: 0
      }
    }]
  }]
},
{
    collection: "surveys"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Survey", surveySchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;