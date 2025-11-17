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
