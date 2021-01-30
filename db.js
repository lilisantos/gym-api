const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const DB_NAME = "gym-app";
const MONGO_OPTIONS = { useUnifiedTopology: true , useNewUrlParser: true };

module.exports = () => {
    
    const get = (collectionName, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.error('====== An error occurred connecting to MongoDB: ', err);
                    return reject(err);
                }
                    const db = client.db(DB_NAME);
                    const collection = db.collection(collectionName);
                    
                    collection.find(query).toArray((err, docs) => {
                        if (err) {
                            console.log("  ==== get::collection.find");
                            console.log(err);
                            return reject(err);
                        }
                        
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

                collection.insertOne(item, (err, result) => {
                    if(err){
                        console.log("==== add:: MongoCLient.insert");
                        console.log(err);
                        return reject(err);
                    }
                    resolve(result);
                    client.close();
                });
            });
        });
    };

    const update = (collectionName, pipeline = []) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("==== update:: MongoCLient.connect");
                    console.log(err);
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);

                collection.updateOne(pipeline[0], pipeline[1], (err, result) => {
                    if(err){
                        console.log("==== update:: MongoCLient.update");
                        console.log(err);
                        return reject(err);
                    }              
                    resolve(result);
                    client.close();
                });
            });
        });
    }; 

    const aggregate = (collectionName, pipeline = []) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("==== aggregate:: MongoCLient.connect");
                    console.log(err);
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection(collectionName);

                collection.aggregate(pipeline).toArray((err, docs) => {
                    if (err){
                        console.log(" --- aggregate ERROR ---");
                        console.log(err);
                    }

                    resolve(docs);
                  
                    client.close();
                });
            });
        });
    };

    //Return member id from provided email
    const findMemberId = (email) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
                if(err){
                    console.log("==== findMemberId:: MongoCLient.connect");
                    console.log(err);
                    return reject(err);
                }
                const db = client.db(DB_NAME);
                const collection = db.collection("member");

                collection.findOne({"email": email}, (err, docs) => {
                    if(err){
                        console.log("==== findMemberId:: MongoCLient.find");
                        console.log(err);
                        return reject(err);
                    }
                    if(docs == null){
                        resolve(null);
                        client.close();
                    }else{
                        resolve(docs._id);
                        client.close();
                    }                   
                });
            });
        });
    }
    

    return {
        get,
        add,
        update,
        aggregate,
        findMemberId
    };
};