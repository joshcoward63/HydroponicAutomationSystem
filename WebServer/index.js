const {MongoClient} = require('mongodb');

const express= require('express')
const app = express()


const uri = "mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test?authSource=admin&replicaSet=atlas-fsz3v6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
 
const client = new MongoClient(uri);

const devicesDatabase = client.db("Devices")

// try{
//      client.connect();
// }catch(e){
//     console.log(e);
//     // console.log("Couldn't connect to MongoDB!");
// }finally{
//     client.close()
// }
   
app.get('/', (req,res)=> { //get method
    res.send('Hello World') //send response
  })

app.get('/temperature',(req,res)=>{
    res.send({"Temp-type": 'Water', "Value": 70, "Zone": 1})
})
app.listen(3000)

try{
    client.connect();
    console.log("Connected to MongoDB!");
}
catch(e){
   console.log(e);
   console.log("Couldn't connect to MongoDB!");
}
finally{
   client.close();
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getTemperature(client){

}

async function getTDS(client){

}

async function getPH(client){

}

async function getEC(client){

}

async function getHumidity(client){


}

async function getWaterLevel(client){
    
}

async function getUserData(client){

}

async function getDevices(clients){

}

async function getZones(client){

}

async function postProgram(client){

}

async function postDeviceState(client){

}

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test?authSource=admin&replicaSet=atlas-fsz3v6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
 

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);