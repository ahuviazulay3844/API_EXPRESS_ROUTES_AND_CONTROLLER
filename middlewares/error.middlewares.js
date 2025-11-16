/**
 * error handling middleware
 * @param {{ status?: number, message?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const errorHandler = (err, req, res, next) => {
    // err - מקבל אוטומטית את כל פרטי השגיאה
    const stat = err.status ?? 500;
    const { message = 'Server Error!' } = err;
    // תמיד רוצים להחזיר שגיאה מהתבנית הבאה
    // 1. סטטוס של שגיאה
    // 2. אוביקט
    // 3. message1 שמכיל error1 אם יש שגיאה - באוביקט יהיה השדה
    res.status(stat).json({ error: { type: message } });
    // next - אין צורך כי מחזירים תגובה בוודאות ללקוח
};
/**
 * error handling middleware
 * @param {{ status?: number, message?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const UrlerrorHandler = ( req, res, next) => {
   next({ status: 404, message: `url ${req.url} method: ${req.method} not found!` });

};