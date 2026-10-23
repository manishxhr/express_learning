const express= require("express");
const app= express();
app.use(express.json());
let users = [
    { id: 1, name: "Rahul", email:"rahul@gmail.com"},
    { id: 2, name: "Manish", email:"manish@gmail.com"}
];
app.use((req,res,next)=>{
    console.log("middleware called");
    const time= new Date();
    console.log(req.method, req.url, time);
    if(req.query.access!="yes"){
        return res.status(403).json({
            "message":"access denied"
        })
    }
    next();
})

app.get("/users",(req,res)=>{
    // req.query.access= "yes";
    res.send(users);
})

app.post("/user",(req,res)=>{
    const name= req.body.name;
    const email= req.body.email;

    const id= users.length+1;

    const user={
        "id":id,
        "name": name,
        "email": email
    }
    users.push(user);
    return res.status(201).json({
        "message": "new user created",
        "user": user
    })
})

app.put("/updateUser/:id",(req,res)=>{
    const id = req.params.id;
    const name= req.body.name;
    const email= req.body.email;

    const user= users.find((user)=>user.id==id);
    if(!user){
        return res.status(500).json({
            "message":"user not found"
        })
    }
    user.name= name;
    user.email= email;

    res.status(200).json({
        "message":"user updated successfully",
        "user":user
    })

})

app.delete("/deleteUser/:id",(req,res)=>{
    const id= req.params.id;
    const user= users.find((user)=>user.id==id);

    if(!user){
        return res.status(401).json({
            "mesage":"user not found"
        })
    }
    users= users.filter((user)=>user.id!=id);
    return res.status(200).json({
        "message":"user deleted"
    })
})






app.listen(3000,()=>{
    console.log("server started on port 3000");
})