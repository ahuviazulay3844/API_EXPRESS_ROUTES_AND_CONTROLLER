/**
 * error handling middleware
 * @param {{ status?: number, message?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const UrlerrorHandler = (err, req, res, next) => {
    // err - מקבל אוטומטית את כל פרטי השגיאה
    const stat = err.status ?? 500;
    const { message = 'Url is not found!' } = err;
    // תמיד רוצים להחזיר שגיאה מהתבנית הבאה
    // 1. סטטוס של שגיאה
    // 2. אוביקט
    // 3. message1 שמכיל error1 אם יש שגיאה - באוביקט יהיה השדה
    if (stat==404)
    {
        res.status(stat).json({ error: { type: message } });
    }
 //  ? errorHandler(err);
    next();//יופיעה אחרי..
    // next - אין צורך כי מחזירים תגובה בוודאות ללקוח
};