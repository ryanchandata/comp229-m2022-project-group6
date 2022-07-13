//---------------------------------------------
//Author: Ryan Chan
//ID: 301220725
//Course Code : COMP229
//Course Name : Web Application Development
//WebApp Name: Book Store
//---------------------------------------------

import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const BookSchema = new Schema
({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

const Model = mongoose.model('Book', BookSchema);
export default Model;
