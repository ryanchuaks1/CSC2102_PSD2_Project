const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');


const Mongo = {
  host: 'mongodb',
  port: 27017,
  username: 'root',
  password: 'example',
  authSource: 'admin',
  database: 'lateats'
};

// Connection URI
const MONGO_URI = `mongodb://${Mongo.username}:${Mongo.password}@${Mongo.host}:${Mongo.port}/?authSource=${Mongo.authSource}`;

// Create the Express app
const app = express();
const port = 5000;

app.use(bodyParser.json());

let db;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true });
    db = client.db(Mongo.database);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
};

// Close the MongoDB connection
const closeDB = () => {
  if (db) {
    db.close();
    console.log('Closed MongoDB connection.');
  }
};

// Add a new shop
app.post('/api/addShop', async (req, res) => {
  const shopData = req.body;
  const shopsCollection = db.collection('shops');

  try {
    const result = await shopsCollection.insertOne({
      shopName: shopData.shopName,
      location: shopData.location,
    });

    res.status(201).json({ result: true, message: 'Shop added successfully!' });
  } catch (error) {
    console.error('Error adding shop:', error);
    res.status(500).json({ result: false, message: 'Internal server error' });
  }
});

// Update an existing shop
app.post('/api/updateShop', async (req, res) => {
  const shopData = req.body;
  const shopsCollection = db.collection('shops');

  try {
    const updateResult = await shopsCollection.updateOne(
      { _id: ObjectId(shopData.id) },
      { $set: { shopName: shopData.shopName, location: shopData.location } }
    );

    res.status(201).json({ result: true, message: 'Shop updated successfully!' });
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ result: false, message: 'Internal server error' });
  }
});

// Delete a shop
app.post('/api/deleteShop', async (req, res) => {
  const shopData = req.body;
  const shopsCollection = db.collection('shops');

  try {
    const deleteResult = await shopsCollection.deleteOne({ _id: ObjectId(shopData.id) });

    res.status(201).json({ result: true, message: 'Shop deleted successfully!' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ result: false, message: 'Internal server error' });
  }
});

// Get a specific shop
app.get('/api/getShop/:shop_id', async (req, res) => {
  const shopId = req.params.shop_id;
  const shopsCollection = db.collection('shops');

  try {
    const shop = await shopsCollection.findOne({ _id: ObjectId(shopId) });

    if (shop) {
      res.status(200).json({ body: shop });
    } else {
      res.status(404).json({ result: false, message: 'Shop not found' });
    }
  } catch (error) {
    console.error('Error getting shop:', error);
    res.status(500).json({ result: false, message: 'Internal server error' });
  }
});

// Get all shops
app.get('/api/getShops', async (req, res) => {
  const shopsCollection = db.collection('shops');

  try {
    const allShops = await shopsCollection.find().toArray();

    res.status(200).json({ body: allShops });
  } catch (error) {
    console.error('Error getting shops:', error);
    res.status(500).json({ result: false, message: 'Internal server error' });
  }
});

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  closeDB();
  process.exit();
});