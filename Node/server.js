const http = require("http");
let data = [
    {
      "id": 2,
      "fname": "Shivam",
      "email": "shivam@Wipro.com",
      "role": "trainer"
    },
    {
      "id": 3,
      "fname": "henry",
      "email": "henry@gmail.com",
      "role": "Trainee"
    },
    {
      "id": 4,
      "fname": "Jenny",
      "email": "jenny@gmail.com",
      "role": "Trainer"
    },
    {
      "id": 5,
      "fname": "Pete",
      "email": "peter@gmail.com",
      "role": "HR"
    },
    {
      "fname": "Shruthi",
      "email": "shruthi@wipro.com",
      "role": "trainer",
      "id": 6
    },
    {
      "fname": "vig",
      "email": "vig@gmail.com",
      "role": "trainer",
      "id": 7
    },
    {
      "id": 10,
      "fname": "suresh",
      "email": "suresh@gmail.com",
      "role": "HR"
    },
    {
      "id": 11,
      "fname": "kamala",
      "email": "kamala@gmail.com",
      "role": "Trainer"
    },
    {
      "id": "12",
      "fname": "Nitin",
      "email": "demo@gmail.com",
      "role": "Fullstack Developer"
    },
    {
      "id": "1",
      "fname": "Joe",
      "email": "Joe@wipro.com",
      "role": "Admin"
    },
    {
      "id": "14",
      "fname": "Nitin V H",
      "email": "nitin@wipro.com",
      "role": "Mern Stack Developer"
    },
    {
      "id": "15",
      "fname": "GL",
      "email": "GL@GL.com",
      "role": "Trainer"
    }
  ]
const server = http.createServer((req,res)=>{
    if(req.url===`/data` && req.method==="GET"){
        
        res.end(JSON.stringify(data));
    }
});

server.listen(3001,()=> console.log("server is up"));