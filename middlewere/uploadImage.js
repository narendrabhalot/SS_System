const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

let imageuplaod = upload.array('image')

module.exports.imageuplaod = imageuplaod  