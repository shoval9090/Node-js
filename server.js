const express = require ('express');
const fs = require('fs');

const app = express();
const PORT = 3000;


app.use("/songs",express.static("public"));


// middleware - for body for POST/PUT
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// if the file Dosen't exist - creat & add empty array 
if(!fs.existsSync('music.json')){
    fs.writeFileSync('music.json' , '[]');
}

// fs.readFileSync('music.json').toString(); - ממיר לי את הקובץ מגייסון לסטרינג
app.get('/all',(req,res)=>{
    let musicRes = fs.readFileSync('music.json').toString();
    let x = JSON.parse(musicArr)
    // JSON.pares - convert to JSON 
    res.send (x);
    res.status(200); // OK 
})


app.post('/add',(req,res)=>{

    let musicArr = fs.readFileSync('music.json').toString();
    musicArr = JSON.parse(musicArr);
    musicArr.push(req.body);

    fs.writeFileSync('music.json',JSON.stringify(musicArr));

    res.status(201); // created
    res.send("New song was added Successfully ");

})

// {id:1, name: '' , artist:'' , year:  }

app.put('/update/:song',(req,res) => {
    let musicArr = JSON.parse(fs.readFileSync('music.json').toString());

    // find() -> return the first element that return true for condition:
    let mySong = musicArr.find(x => x.name === req.params.song);

    if( mySong != undefined){
        mySong.year = req.body.year;
        fs.writeFileSync('music.json' , JSON.stringify(musicArr));
    }

    res.status(200); // OK 
    res.send('Song year was update')
});

app.delete('/delet/:id',(req,res)=>{
    let musicArr = JSON.parse(fs.readFileSync('music.json').toString());

    let len = musicArr.length;
    musicArr = musicArr.filter(s=>s.id != req.params.id);

    if(musicArr.length < len){
        fs.writeFileSync('music.json' , JSON.stringify(musicArr));
        res.send("Person was deleted successfull");
    }

    res.send("NO song was found...");
})


app.listen(PORT , ()=> console.log(`Listening in PORT ${PORT}`));
