import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,  // Cloudinary url
        required : true,
    },
    coverImage : {
        type : String,  // Cloudinary url
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        requied : [true, 'Password is required']
    },
    refreshToken : {
        type : String
    }

},{timestamps : true})



// It is hook for doing something just before saving the data like encrypting the password

// yaha par callback aayega but we can't write like this ()=>{} bcoz in this we don't have this
// keyword so we don't know the context so to tackle this we simply write like this 
// function () { }

// we had write async bcoz it takes some time so for this we have written async keyword
// also we have written next flag bcoz it is middleware and at the end when our work is done
// we have to call this next flag means to pass this next flag forward...


// And bcoz of using function we have access to all the fields
userSchema.pre("save", async function (next) {

    // but ye har baar run hoga and password ko update hash karta rhega even if user did not 
    // updated it bcoz after submitting the save button it will run and update the hash

    // So to tackle this we have to apply if else condition
    // here ! negative is used
    if(!this.isModified("password")) return next(); 

    this.password = bcrypt.hash(this.password, 10) // it needs 2 things 1st is kya hash karna hai
    next()                                           // 2nd is salt or rounds like 10
} )

// Custom method for password comapring
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            userName : this.userName,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)