import { NextFunction, Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import admin from '../config/firebase-service';
import { RequestWithUser } from 'globalTypes';

//the user gets an 'unauthorized' error every time they try to access a private resource without being authenticated with this middleware in place.

export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization?.split(' ')[1];

  idToken && admin.auth().verifyIdToken(idToken, true)
    .then((decodedToken: DecodedIdToken) => {
      // Add the user object to the request for further processing
      (req as RequestWithUser).user = decodedToken;

      next();
    }).catch((error) => {
      if (error.code === 'auth/id-token-revoked') {
        return res.status(401).json({ message: 'Token revoked' });
      } else if (error.code === 'auth/user-disabled') {
        return res.status(403).json({ message: 'User disabled' });
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    })
};