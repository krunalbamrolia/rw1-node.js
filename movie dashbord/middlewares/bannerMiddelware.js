const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null, './views/uploads');
    },
    
    filename: (req,file,cb) => {
        const bannerName = Date.now() + Math.round(Math.random() * 10000000) + '-' + file.originalname;
        cb(null, bannerName);
    }

})

const bannerUpload = multer({storage})

module.exports = bannerUpload