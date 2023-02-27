const express = require ("express");
require('./config/connect');
const User = require('./model/User'); 
const app = express(); 
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),swaggerDocument = require('./swagger.json');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); 
const PORT=8002;
app.get('/users', async (req,res)=> {
   try{
let usr = await User.find();
res.send(usr)
}
catch (error) {
   res.send(error)
}
})
app.post('/ajouter',async(req,res)=>{
   try {
      let   data = req.body;
      let e = new User(data);
      console.log(e)
      let saved = await e.save();
      res.send(saved)
      console.log(saved)
   }
   catch(error){
      res.send(error)
   }
})
      app.post('/modifier/:id',async(req,res)=>{
         try {
            let   data = req.body;
            let id = req.params.id;
            let e = await User.findByIdAndUpdate({_id : id},data)
            let saved = await e.save();
            res.send(saved);
         }
         catch(error){
            res.send(error)
         }
      })
      app.delete('/delete/:id',async (req,res)=> {
   
         try{ let myid =req.params.id;
            let usr = await  User.findOneAndDelete({_id : myid})
         res.send(usr)}
         catch(error) {
         res.send(error)
         }
      })
app.use(
   '/api-docs',
   swaggerUi.serve, 
   swaggerUi.setup(swaggerDocument)
 );
app.listen(PORT,(req,res)=>{
console.log(`Server is running successfully on port http://localhost:${PORT}`)
})