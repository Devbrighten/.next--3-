import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },  
    process.env.JWT_SECRET!,              
    { expiresIn: "1d" }                   
  );
  return token;

};
