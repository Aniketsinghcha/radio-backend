const express = require('express');
const router= express.Router();
 const {DriverController}=require('../../controllers/index');
router.post('/',DriverController.createDriver);
router.post('/location',DriverController.updateDriverLocation);
module.exports=router;