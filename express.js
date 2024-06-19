const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const port = 3000;
app.use(bodyParser)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/signup",(req,res)=>{
  console.log("got data:::",req);
      const newAuth=new auth(
        {
          email:req.body.email,
          password:req.body.password
        }
      );
      newAuth.save()
      .then(() => {
        console.log('Save auth data at MongoDB');
        res.send("Sign-up is successful!");
      })
      .catch((error) => {
        console.error(error);
      });

});


app.post("/signin",bodyParser,async(req,res)=>{
    const reqEmail=req.body.email;
    const reqPassword=req.body.password;
    console.log("getting:",req.body);
    const authReturns=await auth.find({
        email:reqEmail,
        password:reqPassword
    });
    if(authReturns.length>0)
        {
            console.log("sign-in successful");
            res.send("sign-in successful");
        }
        else{
            console.log("sign-in failed");
            res.status(404);
            res.send("sign-in failed");
        }
});

const mongoConnection=mongoose.connect(`mongodb://localhost:27017/ferrari`)
.then(()=>{
    console.log("connected to mongo db");
})
.catch((err)=>{
    console.log("error in connecting to mongo db");
});