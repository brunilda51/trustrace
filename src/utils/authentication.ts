import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Payload {
  userId: number;
  email: string;
  name: string;
  username: string;
}

export function passwordHash(password: string): Promise<string> {
  return bcrypt.hashSync(password, 10);
}

export async function passwordCompare(
  text: string,
  encryptedText: string
): Promise<boolean> {
  return bcrypt.compare(text, encryptedText);
}

export function generateToken(
  id: number,
  email: string,
  name: string,
  username: string
): string {
  console.log(process.env.JWT_EXPIRES_IN);
  const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret";
  const payload: Payload = {
    userId: id,
    email: email,
    name: name,
    username: username,
  };
  const option = { expiresIn: process.env.JWT_EXPIRES_IN };

  return jwt.sign(payload, secretKey, option);
}

export function validateToken(token: string): Payload | null {
  try {
    const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret";
    return jwt.verify(token, secretKey) as Payload;
  } catch (err) {
    return null;
  }
}
