import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const hash = crypto.randomBytes(8).toString("hex");
        const ext = path.extname(file.originalname);
        cb(null, `${hash}${ext}`);
    }
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 //2MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")){
            cb(new Error("Apenas imagens"));
        }
        cb(null, true);
    }
});