// Array of student 
/*
GET - Get all the student
POST - add a new student to the Array
PUT - Update a new avgGrade for Student
*/


const express = require("express");

const app = express();
const PORT = 3500;


// Middleware - תווכה  
//Allow us to open and use the body (for POST and PUT )
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let StudentArray=[];

// return to the user the students list:
app.get('/',(req,res)=>{

    res.status(200);
    res.send(StudentArray);
});

// add a new student to the list: (body)
app.post("/add", (req, res) =>{ 

    StudentArray.push(req.body);
    res.status(201);
    res.send("New student was added to the list");
});


//Update student's avgGrade : (params + body)
// /Update /john , /update/alex
// We get: name from params , and new avgGrade from body
app.put('/update/:s', (req,res)=>{

    // this variable will hold the User name for params.
    let student=StudentArray.find(st=>st.name===req.params.s);
    
    // if we find this student :
    if(student!=undefined)
        student.avgGrade=req.body.avgGrade;

    res.status(200); // ok
    res.send("Student's avgGrade was updated successfully");
});

// Delete a student from the list (by student's name) - (params)
app.delete('delete/:s' , (req,res)=> {

    // Delet a student if his name is the seme to : s from the url.
    StudentArray = StudentArray.filter(student => student.name !== req.params.s);
    // returnes values :
    // res.status(204); // 204 is empty response.
    res.send ("Student was deletes succesfully");
})

// listen(port, callback function) -> activate the app
app.listen(PORT, () => console.log(`Listening in port ${PORT}...`));

