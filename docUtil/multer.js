const multer = require("multer");
const path = require( 'path' );

const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});


const checkFileType = (req, file, cb) => {
    const ext = path.extname( file.originalname ).toLowerCase();
    if ( ext === '.jpeg' || ext === '.jpg' || ext === '.png' ) {
        cb(null, true)
    } else {
        cb(new Error('Unsupported file format'), false)
    }}
    
const postImageUploader = multer( {
    storage: storage,
    fileFilter: checkFileType,
    
    limits: {
        fileSize: 1024 * 1024 * 7,
    }
} ).array( 'image',4 );


module.exports = postImageUploader;