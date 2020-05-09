const express =require('express');
const router=express.Router();
const Ninja=require('./models/ninjas');



router.get('/ninjas',function(req,res,next){
   // res.send({type:"GET"});

//    Ninja.geoNear(
//        { type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
//         { maxDistance:10000,spherical:true }
   
//    ).then(function(ninjas){
//        res.send(ninjas);
//    });

// Ninja.aggregate([
//     {
//         '$geoNear':{
//             'near':{'type':'Point','coordinates':[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
//             distanceField: "dis.Calcualted",
//                 spherical:true,
//                 maxDistance:10000
//          }
//     }

// ],function(ninjas){
//     res.send(ninjas);

//                     });


Ninja.aggregate().near({
    near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    maxDistance: 100000,
    spherical: true,
    distanceField: "dist.calculated"
   }).then(function(ninjas){
       res.send(ninjas);
   })


});

router.post('/ninjas',function(req,res,next){
    console.log(req.body);
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
    
});

router.put('/ninjas/:id',function(req,res,next){
    // res.send({type:"PUT"});
    Ninja.findOneAndUpdate({_id:req.params.id},req.body).then(function(){
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
            res.Send(ninja);
        });

    });
});

router.delete('/ninjas/:id',function(req,res,next){
    // res.send({type:"DELETE"});
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);

    });
});


module.exports=router;