const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path=require("path");

const express=require("express");
const app=express();
const port=8080;

let methodOverride = require('method-override');

const {v4:uuidv4}=require('uuid');
uuidv4();

app.use(express.static(path.join(__dirname,"public")));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Employee',
  password:'................'
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let createRandomUser=()=> {
  return [
     faker.string.uuid(),
    faker.internet.username(), 
    faker.internet.email(),
     faker.internet.password(),
  ];
}

let data=[];

// for(let i=0;i<=100;i++){
//     data.push(createRandomUser(i));
// };

// let q=`INSERT INTO users (userId, username, email, password)
// VALUES ? `;

// try{
//     connection.query(q,[data],(err, results) => {
//     if(err) throw err;
//     console.log(results); 
//   }
// );
// }
// catch(err){
//   console.log(err);
// }

//  res.render("home.ejs");


// Add a New-User

app.get("/show/new",(req,res)=>{
    res.render("new.ejs");
})

// New-User Information
app.post("/show",(req,res)=>{

    let {username,email,password}=req.body;
     let userId=uuidv4();

      // Create data array
    let data = [];

    data.push([
        userId,
        username,
        email,
        password
    ]);
     
       let q = `  INSERT INTO users (userId, username, email, password) VALUES ? `;

        try{
         connection.query(q,[data],(err, results) => {
        if(err) throw err;
         //  console.log(results);
          res.redirect("/show"); 
        }
          );
        }
          catch(err){
           console.log(err);
        }
});


// Home-Route
app.get("/",(req,res)=>{
 let q=`SELECT COUNT(*) FROM users`;
try{
    connection.query(q,(err, results) => {
    if(err) throw err;
    let data= results[0]["COUNT(*)"] ;
    res.render("home.ejs",{data}); 
  });
}
catch(err){
  console.log(err);
}
});

// Show-Route
 app.get("/show",(req,res)=>{

  let q=`SELECT * FROM users`;
try{
    connection.query(q,(err, results) => {
    if(err) throw err;
     let data=results;
  //   console.log(data[0]);
   res.render("show.ejs",{data}); 
  });
}
catch(err){
  console.log(err);
}
});

// Edit-Route
app.get("/show/:id/edit",(req,res)=>{

    let {id}=req.params;

    let q=`SELECT * FROM users WHERE userId='${id}'`;
    try{
    connection.query(q,(err, results) => {
    if(err) throw err;
     let data=results[0];
    res.render("Edit.ejs",{data});
  });
}
catch(err){
  console.log(err);
}
})

// Update-Route
// app.patch("/show/:id",(req,res)=>{
//     let {id}=req.params;
//      let { newusername } = req.body;
//      let q=`UPDATE users SET username='${newusername}' WHERE userId='${id}'`;
//      try{
//     connection.query(q,(err, results) => {
//     if(err) throw err;
//      res.send("SuccessFully Updated");
//      });
//       }
//     catch(err){
//       console.log(err);
//       }
//     })



app.patch("/show/:id",(req,res)=>{
    let {id}=req.params;
     let { newusername ,password } = req.body;

     let q=`SELECT * FROM users WHERE userId='${id}'`;

     try{
    connection.query(q,(err, results) => {
     if (err) {
            console.log(err);
            return res.send("Database Error");
        }

    let data=results[0];

     if (!data) {
                res.send("User not found");
                return;
            }
    
     if(password != data.password){
        res.send("Wrong PassWord");
     }else{
       let q=`UPDATE users SET username='${newusername}' WHERE userId='${id}'`;
       connection.query(q,(err,results)=>{
         if(err) throw err;
         res.redirect("/show");
       })
     }
     });
      }
        catch(err){
        console.log(err);
        }
    })


  // See-In-Detail
 app.get("/show/:id",(req,res)=>{
    let {id}=req.params;
     let q=`SELECT * FROM users WHERE userId='${id}'`;
      try{
    connection.query(q,(err, results) => {
    if(err) throw err;
     let data=results[0];
    res.render("see.ejs",{data});
  });
}
catch(err){
  console.log(err);
}
});


// Delete

app.delete("/show/:id",(req,res)=>{
  let {id}=req.params;

  let q = `DELETE FROM users WHERE userId='${id}'`;
        try{
    connection.query(q,(err, results) => {
    if(err) throw err;
     res.redirect("/show");
  });
}
catch(err){
  console.log(err);
}
});




app.listen(port,()=>{
  console.log(` app listening port ${port}`);
});








// connection.end();



