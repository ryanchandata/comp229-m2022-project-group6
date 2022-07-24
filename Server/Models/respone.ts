// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const responeSchema = new Schema
({
  SurveyID: String, // user's id
  Answers: [{
    QuestionID: String,
    OptionID: String,
    Value: String
  }]
},
{
    collection: "respones"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Respone", responeSchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;