import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET: Serve image
const getImage = (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "../uploads", imageName);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.sendFile(imagePath);
  });
};

// POST: Upload image or video
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Determine if the uploaded file is an image or a video
  const fileType = req.file.mimetype.startsWith("image/") ? "image" : "video";
  const fileUrl = `${req.protocol}://${req.get("host")}/${fileType}s/${
    req.file.filename
  }`;

  // console.log(fileUrl);

  return res.status(201).json({
    message: `uploaded successfully`,
    fileUrl,
  });
};

// GET: Stream video
const streamVideo = (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = path.join(__dirname, "..", "../uploads", videoName);

  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Video not found" });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res.status(416).send("Requested range not satisfiable\n");
        return;
      }

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });
};

const deletefile = (req, res) => {
  const localpath = req.params.id;
  fs.unlinkSync("./uploads/" + localpath); // Ensure file gets deleted

  return res.status(201).json({
    status: "success",
    message: "image delete",
    url: localpath,
  });
};

export { getImage, uploadImage, streamVideo, deletefile };
