const express = require('express');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;



const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5001;



const uri = 'mongodb+srv://SAK_Assicoation:cmgSN0WAtwzBFkSD@cluster0.a3ykp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





async function run() {
    try {
        await client.connect();
        const database = client.db("SAK-Assicoation");
        const memberCollection = database.collection("member");
        const depositCollection = database.collection("deposit");

        app.post('/members', async (req, res) => {

            const newUser = req.body
            const result = await memberCollection.insertOne(newUser);
            console.log("got new user", req.body);
            console.log("added user", result);
            res.json(result);
        });

        app.post('/deposit', async (req, res) => {

            const newDeposit = req.body
            const result = await depositCollection.insertOne(newDeposit);
            console.log("got new user", req.body);
            console.log("added user", result);
            res.json(result);
        });

        app.get('/members', async (req, res) => {
            const query = memberCollection.find({});
            const cursor = await query.toArray();
            res.send(cursor);
            console.log('Member loaded successfull')
        });

        app.get('/deposit', async (req, res) => {
            const query = depositCollection.find({});
            const cursor = await query.toArray();
            res.send(cursor);
            console.log('deposit loaded successfull')
        });



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log("Listening form Port:", port)
});