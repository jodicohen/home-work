const express=require("express");
const gameRouter=require("./games");

const app=express();
app.use(express.json())

app.use("/game",gameRouter)

app.listen(4000,()=>{
    console.log("app is lutening on port 4000")
})