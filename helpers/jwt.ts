import jwt from 'jsonwebtoken';

const DEFAULT_OPTIONS = {
  expiresIn: '30d',
};

export const signJwtAccessToken = (payload: any, options = DEFAULT_OPTIONS) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secretKey as string, options);
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secretKey as string);
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
};
