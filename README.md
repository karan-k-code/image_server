
# Media Upload and Streaming Server

This is an Express.js server that handles image uploads, file deletions, and video streaming. It uses `multer` for handling file uploads and supports CORS for cross-origin requests.

## 🚀 Features

- Upload images
- Stream video files
- Delete uploaded files
- CORS enabled


## 📁 Project Structure
```
/image_server
├── src
|   ├── controllers/
│   |   └── imageController.js  # image and video controller
│   ├── app.js                  # Main server file
├── uploads/   
│ └── [uploaded files]          # image and video
├── LICENSE                     # MIT license
├── README.md                   # Documentation
```

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/karan-k-code/image_server.git
   cd image_server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   CORS_ORIGINS=your_server_url/frontend_url
   ```

4. Create the uploads/ directory:
    ```bash
    mkdir uploads
    ```
5. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/upload` |new image or video |
| GET | `/images/:imageName` | geting image by image name |
| GET | `/videos/:videoName` | geting video by video name |
| POST | `/delete/:id` | delete image and video by name |


## Contributing
Feel free to fork the repository and submit pull requests with improvements or bug fixes.


1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push to your fork and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any queries, reach out to [kitmoindia@gmail.com/contact].