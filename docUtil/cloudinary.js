const cloudinary=require("cloudinary").v2;
/*const dotenv=require("dotenv");
dotenv.config({path:"../config/config.env"})*/
cloudinary.config({
  cloud_name :'djidnusq7',
  api_key : '242751268645137',
  api_secret :'jvSAy75jPFJTPN6lIapZxo9r_ZM'
})
module.exports=cloudinary;