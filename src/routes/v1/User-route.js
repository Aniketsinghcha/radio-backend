const express = require('express');
const router= express.Router();
const {UserController}=require('../../controllers');
const UserMiddleware=require('../../MiddleWares/User-Middleware');

router.post('/',UserMiddleware.validateUserReq,UserController.createUser);
module.exports=router;