const express = require('express')
const app = express();
const mongoose =require('mongoose')
const dbMessages = require('./dbMessages')
const Pusher = require("pusher");
const cors = require('cors');

const pusher = new Pusher({
  appId: "1105780",
  key: "c786f1e7c07437c8e5da",
  secret: "661cef99c94bc651fb7e",
  cluster: "ap2",
  useTLS: true
});
const connection_url='mongodb+srv://balu:211221@cluster0.uycl8.mongodb.net/whatsappdb?retryWrites=true&w=majority'

const db =mongoose.connection;
db.once("open",()=>{
    const msgCollection =db.collection("dbmessages");
    const changeStream =msgCollection.watch();
    changeStream.on("change",(change)=>{
        console.log("a change occres",change)
    })
})
//middleawre

app.use(express.json());
app.use(cors())

// mongoose.connect(connection_url,{
//     useCreateIndex: true,
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

const connectDB = async () => {

    try{
        await mongoose.connect(connection_url,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('MongodDB Connected')
    } catch(err){
        console.error(err.message);
        process.exit(1);//exit proccess wiht failure
    }
}
connectDB();



///routes
app.get("/",(req,res)=>{
    dbMessages.find((err,data)=>{
       if(err){
        res.status(500).send(err)
       }else {
        res.status(200).send(data)
    }
        
    })
})

app.post('/api/v1/messages/new',(req,res)=>{
    const dbMessage = req.body;

    dbMessages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })

})

const port =process.env.PORT || 3003;

app.listen(port,()=>{
    console.log('server is rungin');
})