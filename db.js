const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID
const DB_NAME = "gym-app";
const MONGO_OPTIONS = { useUnifiedTopology: true , useNewUrlParser: true };

module.exports = () => {
    
    const count = (collectionName, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("=== count:: MongoClient.connect");
                    console.log(err);
                    return reject(err);
                }

                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);

                collection.countDocuments({query}, (err, docs) => {
                    if(err){
                        console.log("=== count:: MongoClient.count");
                        console.log(err);
                        return reject(err);
                    }
                    resolve(docs);
                    client.close();
                });
            });
        });
    };  
       
    const get = (collectionName, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);
                
                collection.find(query).toArray((err, docs) => {
                    resolve(docs);
                    client.close();
                });
            });            
        });
    };

    const add = (collectionName, item) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {

                if(err){
                    console.log("==== add:: MongoCLient.connect");
                    console.log(err);
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);

                // collection.insertOne(item, (err, result) => {
                //     if(err){
                //         console.log("==== add:: MongoCLient.insert");
                //         console.log(err);
                //         return reject(err);
                //     }
                //     resolve(result);
                // });
            });
        });
    };

    return {
        get,
        count,
        add,
    };
};