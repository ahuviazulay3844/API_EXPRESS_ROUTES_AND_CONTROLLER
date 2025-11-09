 /**
     * middleware block server on some days
     * @param {import("express").Request} req request data
     * @param {import("express").Response} res response data
     * @param {import("express").NextFunction} next function to move to the next middleware
     */
export const DateMiddleware = (req, res, next) => {
     req.currentDate = new Date();
     next();
};

