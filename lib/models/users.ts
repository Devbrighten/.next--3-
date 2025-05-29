
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "कृपया सही ईमेल डालें"],
  },
  password: { type: String, required: true },
  token: { type: String },
  resetPasswordOtp: { type: String },
  resetPasswordOtpExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Add index for better performance
userSchema.index({ email: 1 })
userSchema.index({ resetPasswordOtp: 1 })

const UserModel = mongoose.models.User || mongoose.model("User", userSchema)

export default UserModel

// import mongoose from "mongoose";

// const clientSchema = new mongoose.Schema({
//   fname: { type: String, required: true },
//   lname: { type: String, required: true },
//   number: {
//     type: String, //Mobile number ko string hi rakho (leading 0 ya 10-digit handle hota hai)
//     required: true,
//   },
//   email: {
//     type: String, 
//     required: true ,
//     unique: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, "कृपया सही ईमेल डालें"]
//   },
//   password: { type: String, required: true }, 
//   token: { type: String },  //Token 
//   resetPasswordOtp: { type: String },
//   resetPasswordOtpExpiry: { type: Date },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// // Model name should be singular ("User") to avoid confusion
// const UserModel = mongoose.models.User || mongoose.model("User", clientSchema);

// export default UserModel;

//=========================================================================================================================================


// import mongoose from "mongoose";

// const clientSchema = new mongoose.Schema({
//     fname: { type: String, required: true },
//     lname: { type: String, required: true },
//     number: { type: Number, default: 0 },
//     email: { type: String, required: true },
//     password: { type: String, required: true }, 
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// })

// // Mongoose model jo data validate + store karta hai
// const UserModel = mongoose.models["users"] || mongoose.model("users", clientSchema);

// export default UserModel
