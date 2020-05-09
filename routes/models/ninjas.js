const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//creating GeoJson that is for taking coordinate and map it over earth and check
const GeoSchema=new Schema(
    {
        type:{
            type:String,
            default:"Point"
        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }
    }
);



const NinjaSchema = new Schema
({
    name:{
        type:String,
        require:[true,'name is required']

    },
    rank:{
        type:String     
        }
    ,
    available:{
        type:Boolean,
        default:true

    },

    geometry:GeoSchema

});


//now we are going to create a model that or we can say a class type which will store in db,its name will be ninja 
//which is passed in model as a parameter
const Ninja=mongoose.model('ninja',NinjaSchema);

module.exports=Ninja