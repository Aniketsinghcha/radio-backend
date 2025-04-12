const express = require('express');
const router= express.Router();
const {MapController}=require('../../controllers');

router.get('/',MapController.getCoordinatesFromAddress);
router.get('/address',MapController.getAddressFromCoordinates);
router.get('/autoComplete',MapController.autoCompleteAddress);
router.get('/eta',MapController.calculateEstimatedTimeAndDistanceOfArrival);
module.exports=router;