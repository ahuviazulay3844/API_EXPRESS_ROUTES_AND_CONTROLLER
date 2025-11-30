import Joi, { date, string, types } from 'joi';
export const validateUseBooks = {
    // user login (email, password)
    addBook : Joi.object({
        name: Joi.string().min(2).max(100).required(),  
        category: Joi.string().min(2).max(50).required(),
        price: Joi.number().integer().min(1).required()  
    }),
    updateBook:Joi.object({
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(50).required(),
    price: Joi.number().integer().min(1).required()
    }),
    borrowBook: Joi.object({
        id_cust: Joi.string().min(1).required() 
    }),
};
// 1. יצירת סכמה שהיא תבנית לאוביקט בודד בטבלה
const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name:{type:string,unique:true},
    category:{type:string,unique:true},
    price: Number,

    borrowingHistory: [{ // אוביקט שמכיל את כל השדות שצריכים של היוזר
        customerCode:{type:string},
        dateBorrowed:{type:date}
    }]

});
