import mongoose, { Schema, model } from 'mongoose';
import Joi from 'joi';


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
// // 1. יצירת סכמה שהיא תבנית לאוביקט בודד בטבלה
//  export const bookSchema = new Schema({
//     _id: Schema.Types.ObjectId,
//     name:{type:string,unique:true},
//     category:{type:string,unique:true},
//     price: Number,

//     borrowingHistory: [{ // אוביקט שמכיל את כל השדות שצריכים של היוזר
//         customerCode:{type:string},
//         dateBorrowed:{type:date}
//     }]
    

// });
// const book = model('book', bookSchema);


// 1. הגדרת הסכמה
export const bookSchema = new Schema({
    // אין צורך ב-_id כאן, Mongoose מוסיף אותו אוטומטית

    name: {
        type: String,
        required: true,
        unique: true, // שם הספר חייב להיות ייחודי
        minlength: 2,
        maxlength: 100
    },
    category: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    // שדה לניהול השאלה
    isBorrowed: {
        type: Boolean,
        default: false
    },
    // היסטוריית השאלה
    borrowingHistory: [{
        customerCode: {
            type: String,
          
        },
        dateBorrowed: {
            type: Date,
            default: Date.now
        },
        dateReturned: {
            type: Date,
            default: null
        }
    }]
});

// 2. יצירת המודל
 const Book = model('Book', bookSchema);
 export default Book; // זה מה שמייצאים
// 3. ייצוא המודל והולידציה של Joi

