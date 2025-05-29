import jwt from "jsonwebtoken";

// Define proper user type interface
interface User {
  _id: string;
  email: string;
}

export const generateToken = (user: User) => { // Fix any type
  const token = jwt.sign(
    { id: user._id, email: user.email },  
    process.env.JWT_SECRET!,              
    { expiresIn: "1d" }                   
  );
  return token;
};