const{
    json,
    urlencoded
}=require("express")
const express=require("express")
const app=express()

app.use(json())
app.use(urlencoded({
   extended:false
}))

const PORT=process.env.PORT||4000;

app.post('/btpjob',(req,res)=>{
    const {firstName,lastName} =req.body;
    res.status(201).send(`hello ${firstName} ${lastName}`);
})

app.get('/',(req,res)=>{
    res.send("welcome btp job")
})

app.listen(PORT,console.log(`listening to port ${PORT}`))