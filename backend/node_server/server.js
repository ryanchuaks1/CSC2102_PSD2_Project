const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const Mongo = {
  host: "mongodb",
  port: 27017,
  username: "root",
  password: "example",
  authSource: "admin",
  database: "lateats",
};

// Connection URI
const MONGO_URI = `mongodb://${Mongo.username}:${Mongo.password}@${Mongo.host}:${Mongo.port}/?authSource=${Mongo.authSource}`;

// Create the Express app
const app = express();
const PORT = 5000;
const HOST = "0.0.0.0";

app.use(bodyParser.json());
app.use(cors());

let db;
let client;

// Connect to MongoDB
const connectDB = async () => {
  try {
    client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true });
    db = client.db(Mongo.database);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
};

// Close the MongoDB connection
const closeDB = () => {
  if (db) {
    db.close();
    console.log("Closed MongoDB connection.");
  }
};

app.get("/", (request, response) => {
  response.send("Hello, World!");
});
//----------------------------------------------------------------------------------
// ----------------------------- Shop CRUD Operations ------------------------------
//----------------------------------------------------------------------------------

// Add a new shop and create a new user
app.options("/shops/account/create", cors());
app.post("/shops/account/create", cors(), async (req, res) => {
  const data = req.body;
  const shopsCollection = db.collection("shops");
  const usersCollection = db.collection("users");
  let curr_shopId;

  try {
    //Insert Shop/Restaurant
    const insertResult = await shopsCollection.insertOne({
      name: data.shop.name,
      street: data.shop.street,
      longitude: data.shop.longitude,
      latitude: data.shop.latitude,
      cuisine: data.shop.cuisine,
      discounttime: data.shop.discounttime,
      closingtime: data.shop.closingtime,
      discount: data.shop.discount,
      rating: data.shop.rating,
      picture: data.shop.picture,
    });

    curr_shopId = insertResult.insertedId;

    //Insert User
    const userResult = await usersCollection.insertOne({
      email: data.user.email,
      password: data.user.password,
      shop_id: curr_shopId,
    });

    if (!userResult.insertedId) {
      throw new Error("Failed to insert user");
    }

    res
      .status(201)
      .json({ result: true, message: "Shop and user added successfully!" });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
    if (curr_shopId) {
      // If an error occurred and a shop was inserted, delete the inserted shop
      await shopsCollection.deleteOne({ _id: curr_shopId });
    }
  }
});

// Update an existing shop
app.put("/shops/update", cors(), async (req, res) => {
  const shopData = req.body;
  const shopsCollection = db.collection("shops");

  try {
    const updateResult = await shopsCollection.updateOne(
      { _id: ObjectId(shopData.id) },
      { $set: { shopName: shopData.shopName, location: shopData.location } }
    );

    res
      .status(201)
      .json({ result: true, message: "Shop updated successfully!" });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

// Delete a shop
app.delete("/shops/delete", cors(), async (req, res) => {
  const shopData = req.body;
  const shopsCollection = db.collection("shops");

  try {
    const deleteResult = await shopsCollection.deleteOne({
      _id: ObjectId(shopData.id),
    });

    res
      .status(201)
      .json({ result: true, message: "Shop deleted successfully!" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

// Get a specific shop and all of its items
app.get("/shops/view/:shop_id", cors(), async (req, res) => {
  const shopId = req.params.shop_id;
  const shopsCollection = db.collection("shops");
  const itemsCollection = db.collection("items");

  try {
    console.log("from server.js: shopId: ", shopId, "ObjectId(shopId): ", ObjectId(shopId));
    const shop = await shopsCollection.findOne({ _id: ObjectId(shopId) });
    const items = await itemsCollection.find({ shop_id: shopId }).toArray();

    if (shop && items) {
      res.status(200).json({
        body: {
          shop: shop,
          items: items,
        },
      });
    } else {
      res.status(404).json({ result: false, message: "Shop not found" });
    }
  } catch (error) {
    console.error("Error getting shop:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

// Get all shops
app.get("/shops/index", cors(), async (req, res) => {
  const shopsCollection = db.collection("shops");

  try {
    const allShops = await shopsCollection.find().toArray();

    res.status(200).json({ body: allShops });
  } catch (error) {
    console.error("Error getting shops:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

//Get shops nearby
app.get("/shops/nearby", cors(), async (req, res) => {
  const { longitude, latitude } = req.query;
  const shopsCollection = db.collection("shops");

  try {
    const long = parseFloat(longitude);
    const lat = parseFloat(latitude);

    //Getting the nearby shops query
    const range = 0.1;
    const query = {
      longitude: { $gte: long - range, $lte: long + range },
      latitude: { $gte: lat - range, $lte: lat + range },
    };

    const nearbyShops = await shopsCollection.find(query).toArray();

    res.status(200).json({ body: nearbyShops });
  } catch (error) {
    console.error("Error getting nearby shops:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

//Get the top 50 shops and pick 10 random shops
app.get("/shops/top", cors(), async (req, res) => {
  const shopsCollection = db.collection("shops");

  try {
    const topShopsPipeline = [
      { $sort: { rating: -1 } }, // Sort by rating in descending order
      { $limit: 50 }, // Limit to the top 50 shops
      { $sample: { size: 10 } }, // Randomly select 10 entries from the top 50
    ];

    const topRandomShops = await shopsCollection
      .aggregate(topShopsPipeline)
      .toArray();

    res.status(200).json({ body: topRandomShops });
  } catch (error) {
    console.error("Error getting top shops:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});


//----------------------------------------------------------------------------------
// ----------------------------- Shop CRUD Operations ------------------------------
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// ----------------------------- User CRUD Operations ------------------------------
//----------------------------------------------------------------------------------

// Get a specific user
app.post("/users/login/", cors(), async (req, res) => {
  const { email, password } = req.body;
  const usersCollection = db.collection("users");

  try {
    const user = await usersCollection.findOne({ email: email });
    if (user) {
      res.status(200).json({ body: user });
    } else {
      res.status(404).json({ result: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
  }
});

// Set token for user
app.post("/users/token", cors(), async (req, res) => {
  const { email, token } = req.body;
  const usersCollection = db.collection("users");

  try {
    const updateResult = await usersCollection.updateOne(
      { email: email },
      { $set: { token: token } }
    );
    if (updateResult.modifiedCount === 1) {
      res
        .status(200)
        .json({ result: true, message: "Token set successfully!" });
    } else {
      res.status(404).json({ result: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error setting token:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

// Get user by token
app.get("/users/token/:token", cors(), async (req, res) => {
  const token = req.params.token;
  const usersCollection = db.collection("users");

  try {
    const user = await usersCollection.findOne({ token: token });
    if (user) {
      res.status(200).json({ body: user });
    } else {
      res.status(404).json({ result: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});

// Get shop by user id
app.get("/users/shop/:user_id", cors(), async (req, res) => {
  const userId = req.params.user_id;
  const usersCollection = db.collection("users");
  const shopsCollection = db.collection("shops");

  try {
    const user = await usersCollection.findOne({ _id: ObjectId(userId) });
    if (!user) {
      res.status(404).json({ result: false, message: "User not found" });
      return res
    } 

    const shop = await shopsCollection.findOne({ _id: user.shop_id });

    if (shop) {
      res.status(200).json({ body: shop });
    } else { 
      res.status(404).json({ result: false, message: "Shop not found" });
    }
    
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});
//----------------------------------------------------------------------------------
// ----------------------------- User CRUD Operations ------------------------------
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// ----------------------------- Item CRUD Operations ------------------------------
//----------------------------------------------------------------------------------
app.post("/items/create", cors(), async (req, res) => {
  const { token, item } = req.body;
  const usersCollection = db.collection("users");
  const itemsCollection = db.collection("items");

  let item_id;

  try {
    const user = await usersCollection.findOne({ token: token });
    if (!user) {
      res.status(404).json({ result: false, message: "Invalid token" });
    }

    item_id = await itemsCollection.insertOne({
      name: item.name,
      base_price: item.base_price,
      image: item.image,
      shop_id: user.shop_id
    });

    res
      .status(201)
      .json({ result: true, message: "Shop item added successfully!" });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
    if (item_id) {
      // If an error occurred and a item was inserted, delete the inserted item
      await itemsCollection.deleteOne({ _id: item_id });
    }
  }
});

app.delete("/items/delete", cors(), async (req, res) => {
  const itemData = req.body;
  const itemsCollection = db.collection("items");

  try {
    const deleteResult = await itemsCollection.deleteOne({
      _id: ObjectId(itemData.id),
    });

    res
      .status(201)
      .json({ result: true, message: "Shop deleted successfully!" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
});
//----------------------------------------------------------------------------------
// ----------------------------- Item CRUD Operations ------------------------------
//----------------------------------------------------------------------------------

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, HOST, () => {
    console.log("Server is running on http://${HOST}:${PORT}");
  });
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  closeDB();
  process.exit();
});
