import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, unique: true },
  email:{ type: String,min: 10, lowercase: true },
  password:{ type: String, min: [8, 'Must be at least 8, got {VALUE}'], max: 20, required: true },
  dateCreated: { type: Date, default: Date.now },
  updatedAt: {
    type: Date,
    default: null,
  },
});

export default model('User', userSchema);