import jwt from "jsonwebtoken";

export const verifyToken = (token: string, ) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
     
    return { valid: true, decoded };
  } catch (err) {
    
    return { valid: false, error: err };
  }
};
