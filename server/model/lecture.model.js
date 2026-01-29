import mongoose from 'mongoose';

const lectureSchema=new mongoose.Schema({
    lectureTitle:{
        type:String,
        required:[true,"Please provide lecture title"]
    },
    videoUrl:{
        type:String,
        required:[true,"Please provide lecture video URL"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
    
    isPreviewFree:{
        type:Boolean,
        default:false
    }
},{ timestamps:true
});

const lectureModel=mongoose.model("Lecture",lectureSchema);

export default lectureModel;