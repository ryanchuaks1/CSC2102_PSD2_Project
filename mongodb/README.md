To test your Express server and the CRUD operations, you can use tools like `curl`

**Testing with curl:**

   - **Get all shops:**
     ```bash
     curl http://127.0.0.1:5000/api/getShops
     ```

   - **Create a new shop:**
     ```bash
     curl -X POST -H "Content-Type: application/json" -d "{\"shopName\": \"Example Shop\", \"location\": \"Example Location\"}" http://127.0.0.1:5000/api/addShop
     ```