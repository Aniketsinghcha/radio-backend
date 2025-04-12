const express = require('express');
const router= express.Router();
 const {StatusCodes}= require('http-status-codes');
 const userRouter=require('./User-route');
  const driverRouter=require('./Driver-route');
  const authRoute=require('./Auth-router');
  const mapRouter=require('./Map-router');
 router.use('/user',userRouter);
 router.use('/driver',driverRouter);
 router.use('/auth',authRoute);
 router.use('/map',mapRouter);
router.get('/',(req,res)=>{
    res.status(StatusCodes.OK).json({
        success:true,
        message:'Succesfully hit the endPoint',

    })
});
module.exports=router;
 
