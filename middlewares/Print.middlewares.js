 /**
     * middleware block server on some days
     * @param {import("express").Request} req request data
     * @param {import("express").Response} res response data
     * @param {import("express").NextFunction} next function to move to the next middleware
     */
 const Printmiddlewares = (req, res, next) => {
   if (req.messege==="GET") {
    console.log(req.currentDate)
   } 
    next();
};