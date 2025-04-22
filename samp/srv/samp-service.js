const express=require("express")
const{
    json,
    urlencoded
}=require("express")
const app=express()
app.use(json())
app.use(urlencoded({
   extended:false
}))

const PORT=process.env.PORT||4000;
var server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().PORT
    console.log("Example app listening at http://%s:%s", host, port)
})
// app.post('/btpjob',(req,res)=>{
//     const {firstName,lastName} =req.body;
//     res.status(201).send(`hello ${firstName} ${lastName}`);
// })

app.get('/',(req,res)=>{
    res.send("welcome btp job")
})

// app.listen(PORT,console.log(`listening to port ${PORT}`))


const Todos = cds.entities.samp;
app.post('/btpjob',(req,res)=>{
    const {firstName,lastName} =req.body;
    res.status(201).send(`hello ${firstName} ${lastName}`);
    cds.run(INSERT.into(Todos).entries(req.body))
})