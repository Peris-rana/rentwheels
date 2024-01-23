import jwt from 'jsonwebtoken';

export const requireSignIn = (req, res, next) => {
   try {
      const verifiedToken = jwt.verify(
         req.headers.authorization,
         process.env.JWT_SECRET
      );
      req.user = verifiedToken;
      next();
   } catch (error) {
      console.log(error);
      return res.status(401).send({ message: 'invalid token' });
   }
};
