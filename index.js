require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("fullstackDB");
    const users = db.collection("users");

    // Insert multiple users
    const result = await users.insertMany([
      { name: "Rama", email: "12@gmail.com", role: "teacher" },
      { name: "Amar", email: "amar25@gmail.com", role: "student" },
      { name: "Meera", email: "meera@gmail.com", role: "admin" }
    ]);
    console.log(result.insertedCount, "users inserted ✅");

    // Fetch all users
    const allUsers = await users.find().toArray();
    console.log("Users in DB:", allUsers);
    
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();
