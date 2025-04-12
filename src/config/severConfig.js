const dotenv=require('dotenv');
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    SECRET_KEY:process.env.SECRET_KEY,
    GOOGLE_MAP_API_KEY:process.env.GOOGLE_MAP_API_KEY,
}