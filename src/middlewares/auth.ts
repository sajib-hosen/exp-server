import { Request, Response, NextFunction } from "express";
import catchAsync from "../util/catchAsync";
import AppError from "../errors/AppError";
import config from "../config";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
  email?: string;
}

// const auth = () => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     //console.log("req.headers.authorization");

//     const token = req.headers.authorization;

//     // ----------- checking whether token is sent or not -----------
//     if (!token) {
//       throw new AppError(401, "you are not authorized");
//     }

//     jwt.verify(
//       token,
//       config.jwt.access_secret as string,
//       function (err, decoded) {
//         // ------- err --------
//         if (err) {
//           throw new AppError(401, "You are not authorized");
//         }

//         req.user = decoded as JwtPayload;
//       }
//     );

//     next();
//   });
// };

// export default auth;

export async function accessTokenGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        config.jwt.access_secret as string
      ) as JwtPayload;

      if (!decoded?.id) {
        return res.status(401).json({ message: "User unauthorized!" });
      }

      (req as any).user = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
      };
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: No access token provided" });
  }
}

export async function refreshTokenGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.refreshToken;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
      ) as JwtPayload;

      if (!decoded?.id) {
        return res.status(401).json({ message: "User unauthorized!" });
      }

      (req as any).user = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
      };
      next();
    } catch (error) {
      console.log("refresh error", error);

      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid refresh token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: No refresh token provided" });
  }
}

export async function adminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      // console.log("admin guard", decoded);

      if (!decoded?.id || decoded.role !== "admin") {
        return res.status(401).json({ message: "User unauthorized!" });
      }

      (req as any).user = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
      };
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: No access token provided" });
  }
}
