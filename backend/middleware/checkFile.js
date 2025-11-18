import path from 'path';
import { v4 as uuid } from 'uuid';

const supportedExts = ['.png', '.jpg', '.jpeg', '.gif']

export const checkFile = (req, res, next) => {
    const file = req.files?.image;

    //checking file
    if (!file) return res.status(400).json({
        status: 'error',
        data: 'please provide image file'
    })
    console.log(file);

    //checking valid file
    const fileExts = path.extname(file.name);
    if (!supportedExts.includes(fileExts)) return res.status(400).json({
        status: 'error',
        data: 'please provide valid image file'
    })

    //unique image path
    const imagePath = `${uuid()}-${file.name}`;
    file.mv(`./uploads/${imagePath}`, (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                data: 'Error saving file'
            });
        }

        // Store path for controller
        req.imagePath = imagePath;
        console.log('File path:', imagePath)

        // Continue only after file is saved
        next();
    })
} 