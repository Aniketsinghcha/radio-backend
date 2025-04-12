const {StatusCodes}=require('http-status-codes');
const ErrorResponse={
    success:true,
    data:{},
     error:{},
     StatusCode:StatusCodes.BAD_REQUEST,
};
module.exports=ErrorResponse;