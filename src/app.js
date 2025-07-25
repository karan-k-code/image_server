import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import {
  getImage,
  uploadImage,
  streamVideo,
  deletefile,
} from "./controllers/imageController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGINS),
    credentials: true,
  })
);

//

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5504");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }); // Removed fileFilter

// Routes
app.post("/upload", upload.single("image"), uploadImage);
app.post("/delete/:id", deletefile);
app.get("/images/:imageName", getImage);
app.get("/videos/:videoName", streamVideo); // Added route for video streaming

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
