# Fullstack_Track_Project

## Database Structure:

The database structure consists of three main collections: `Comment`, `Product`, and `Video`.

### Comment Collection:
- `videoId`: The MongoDB ObjectId referencing the `Video` collection, representing the video to which the comment belongs.
- `username`: The username of the commenter.
- `comment`: The comment text.
- `timestamp`: The timestamp when the comment was created (defaulting to the current date).

### Product Collection:
- `productID`: A unique identifier for the product.
- `linkProduct`: The link to the product.
- `title`: The title of the product.
- `price`: The price of the product.
- `videoID`: The ID of the video to which the product is associated.

### Video Collection:
- `title`: The title of the video.
- `thumbnailUrl`: The URL of the video thumbnail.

---

## API Structure:

The API is structured using Express.js, and it follows a RESTful API design. There are three main routes: `productRouter`, `commentRouter`, and `videoRouter`, each responsible for handling specific endpoints related to products, comments, and videos, respectively. These routes are then integrated into the main `api.js` file, which serves as the entry point to the API.

---

## List of API Request and Response:

1. **Comment Endpoints:**

   - `GET /comments`
     - Request: `/comments?videoID=<videoId>`
     - Response:
       - Success (200 OK):
         ```json
         {
           "success": true,
           "data": [
             {
               "_id": "comment_id_1",
               "videoId": "video_id_1",
               "username": "user1",
               "comment": "This is a great video!",
               "timestamp": "2023-08-04T12:34:56.789Z"
             },
             // ...
           ]
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "videoID is required"
         }
         ```
         ```json
         {
           "success": false,
           "error": "Invalid videoID"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Internal server error"
         }
         ```

   - `POST /comments`
     - Request:
       ```json
       {
         "username": "user3",
         "comment": "Nice video, thanks!",
         "videoID": "video_id_1"
       }
       ```
     - Response:
       - Success (200 OK):
         ```json
         {
           "success": true,
           "message": "Comment submitted successfully"
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "All fields are required"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Failed to submit comment"
         }
         ```

2. **Product Endpoints:**

   - `GET /products`
     - Request: `/products?productID=<product_id>`
     - Response:
       - Success (200 OK):
         ```json
         {
           "success": true,
           "data": {
             "_id": "product_id_1",
             "productID": "product_123",
             "linkProduct": "https://example.com/product/123",
             "title": "Product ABC",
             "price": 49.99,
             "videoID": "video_id_2"
           }
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "ProductID is required"
         }
         ```
         ```json
         {
           "success": false,
           "error": "Invalid ProductID"
         }
         ```
       - Error (404 Not Found):
         ```json
         {
           "success": false,
           "error": "Product not found"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Internal server error"
         }
         ```

   - `POST /products`
     - Request:
       ```json
       {
         "productID": "product_456",
         "linkProduct": "https://example.com/product/456",
         "title": "Product XYZ",
         "price": 29.99,
         "videoID": "video_id_2"
       }
       ```
     - Response:
       - Success (201 Created):
         ```json
         {
           "success": true,
           "data": {
             "_id": "product_id_2",
             "productID": "product_456",
             "linkProduct": "https://example.com/product/456",
             "title": "Product XYZ",
             "price": 29.99,
             "videoID": "video_id_2"
           }
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "All fields are required"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Internal server error"
         }
         ```

   - `PUT /products/:productID`
     - Request: `/products/product_id_2`
       ```json
       {
         "title": "Updated Product XYZ",
         "price": 39.99
       }
       ```
     - Response:
       - Success (200 OK):
         ```json
         {
           "success": true,
           "data": {
             "_id": "product_id_2",
             "productID": "product_456",
             "linkProduct": "https://example.com/product/456",
             "title": "Updated Product XYZ",
             "price": 39.99,
             "videoID": "video_id_2"
           }
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "Invalid ProductID"
         }
         ```
         ```json
         {
           "success": false,
           "error": "Product not found"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Internal server error"
         }
         ```

   - `DELETE /products/:productID`
     - Request: `/products/product_id_2`
     - Response:
       - Success (200 OK):
         ```json
         {
           "success": true,
           "message": "Product deleted successfully"
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "Invalid ProductID"
         }
         ```
         ```json
         {
           "success": false,
           "error": "Product not found"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Internal server error"
         }
         ```

3. **Video Endpoints:**

   - `GET /videos`
     - Request: `/videos?videoID=<video_id_1>`
     - Response:
       - Success (200 OK):
         ```json
         {
           "success": true,
           "data": {
             "_id": "video_id_1",
             "title": "Awesome Video",
             "thumbnailUrl": "https://example.com/thumbnail/123.jpg"
           }
         }
         ```
       - Error (400 Bad Request):
         ```json
         {
           "success": false,
           "error": "videoID is required"
         }
         ```
         ```json
         {
           "success": false,
           "error": "Invalid videoID"
         }
         ```
       - Error (404 Not Found):
         ```json
         {
           "success": false,
           "error": "Video not found"
         }
         ```
       - Error (500 Internal Server Error):
         ```json
         {
           "success": false,
           "error": "Internal server error"
         }
         ```

---
## How to Run Locally:

1. Clone the repository containing the API code.
2. Ensure you have Node.js and npm (Node Package Manager) installed on your local machine.
3. Install the required dependencies by running `npm install` in the root directory of the API project.
4. Set up your MongoDB connection. You can create a `.env` file in the root directory and provide the MongoDB connection string as `MONGODB_URI`.
5. Start the API server by running `npm start` in the root directory of the API project.
6. The API should now be running on `http://localhost:PORT`, where `PORT` is the port number specified in your environment or the default port (e.g., 3000).
7. You can use tools like Postman or any HTTP client to interact with the API and make requests to the provided endpoints.
