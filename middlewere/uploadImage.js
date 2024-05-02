const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer storage and file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
    try {
        // Check if request contains multipart form data
        console.log("req.params.id inside ihe midleware ",req.params.id)
        if (!req.is('multipart/form-data')) {
            console.log("err:Request must be sent as multipart/form-data")
            return res.status(400).json({ error: 'Request must be sent as multipart/form-data' });
        }

        // Use multer upload instance
        upload.array('image', 5)(req, res, (err) => {
            if (err) {
                console.error('Error in multer upload:', err);

                // Check for common errors and provide informative responses



            }

            // Retrieve uploaded files
            const files = req.files;
            const errors = [];

            // Validate file types and sizes
            files.forEach((file) => {
                const allowedTypes = ['image/jpeg', 'image/png'];
                const maxSize = 5 * 1024 * 1024; // 5MB

                if (!allowedTypes.includes(file.mimetype)) {
                    errors.push(`Invalid file type: ${file.originalname}`);
                }

                if (file.size > maxSize) {
                    errors.push(`File too large: ${file.originalname}`);
                }
            });

            // Handle validation errors
            if (errors.length > 0) {
                // Remove uploaded files
                files.forEach((file) => {
                    fs.unlinkSync(file.path);
                });

                return res.status(400).json({ errors });
            }

            // Attach files to the request object
            req.files = files;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error('Error in uploadMiddleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = uploadMiddleware;