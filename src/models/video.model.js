import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoFile : {
        type : String,  //Cloudinary url
        required : true
    },
    thumbnail : {
        type : String, //Cloudinary url
        requied : true
    },
    title : {
        type : String,
        requied : true
    },
    description : {
        type : String, 
        requied : true
    },
    duration : {
        type : Number, //Cloudinary url
        requied : true
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }



},{timestamps : true})


// It is for Watch History & it is very complex
// We can do insertOne DeleteMany but even advance work by this package
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)