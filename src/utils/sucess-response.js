const {StatusCodes}=require('http-status-codes');
const SuccessResponse={
    success:true,
    data:{},
     error:{},
     StatusCode:StatusCodes.OK,
};
module.exports=SuccessResponse;