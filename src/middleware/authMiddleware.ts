import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).send("No token!");
  }

  let secretKey = process.env.JWT_SECRET_KEY || "secret";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
    // Token is invalid
    return res.status(401).send("Unauthorized");
  } catch (err) {
    // Catch other errors (e.g., expired token)
    return res.status(401).send("Unauthorized");
  }
};
