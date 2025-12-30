
const DB_URI=`mongodb+srv://ahuviazulay_db_user:A38443844A@cluster0.zonws9n.mongodb.net/`;
const p=mongoose.connect(DB_URI);
try {
    await p;
    // מגיע לשורה 2 רק אחרי שהתליח להתחבר למונגו
    console.log('mongo connected successfuly')
} catch (error) {
    // מגיע לכאן רק אם לא הצליח להתחבר למונגו
    console.log('ERROR:', error.message);
}




const userSchema=new mongoose.Schema({
        username:String,
           email:String,
        password:String,
 repeat_password:String,
            code:String,
   borrowedBooks:Array ,
});

// model - האוסף כולו
const user= new mongoose.model('user',userSchema);

//הוספת איבר לאוסף
const user1=new user({
    username: 'ahuvi', 
    email: 'ahuvi@example.com', 
    password: 'password123', 
    repeat_password: 'password123', 
    code: 'A123', 
    borrowedBooks: ['Mahallalal', 'Wanted']});
await user1.save();