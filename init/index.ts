import * as Readline from "readline/promises";

import { Db } from "mongodb";

import { connectToDatabase } from "@/utils/db";

import { clients, data } from "./data";

const dropCollection = async (db: Db, collectionName: string) => { 
  try {
    await db.dropCollection(collectionName);
    console.log(`   ↪ Collection [${collectionName}] dropped.`);
  }
  catch {
    console.log(`   ↪ Collection [${collectionName}] does not exist.`);
  }
};

const createCollection = async (db: Db, collectionName: string) => {
  try {
    await db.createCollection(collectionName);
    console.log(`   ↪ Collection [${collectionName}] created.`);
  }
  catch {
    console.log(`   ↪ Collection [${collectionName}] already exists.`);
  }
};

const insertData = async (db: Db, collectionName: string, data: any[]) => {
  try {
    const collection = db.collection(collectionName);
    await collection.insertMany(data);
    console.log(`   ↪ Data inserted into [${collectionName}].`);
  }
  catch {
    console.log(`   ↪ Error inserting data into [${collectionName}].`);
  }
};

const init = async () => { 
  const client = await connectToDatabase();
  const db = client.db();

  console.log("\n🚨 This will drop all collections and reinitialize the database.");
  console.log("🚨 Do you want to continue? (y/n)");
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await readline.question("");
  readline.close();
  if (answer !== "y") {
    console.log("🚫 Initialization aborted.");
    client.close();
    return;
  }
  
  console.log("\n🚀 Initializing database...\n");
  console.log("🗑️  Dropping collections...");

  //get collection names
  const collections = await db.listCollections().toArray();
  for (const collection of collections) {
    await dropCollection(db, collection.name);
  }

  console.log("\n📌 Ceating collections...");
  await createCollection(db, "users");
  await createCollection(db, "data");
  await createCollection(db, "clients");

  console.log("\n📇 Inserting data...");
  await Promise.all([
    insertData(db, "data", data),
    insertData(db, "clients", clients),
  ]);
  
  console.log("\n🎉 Initialization complete.");
  client.close();
};

init();