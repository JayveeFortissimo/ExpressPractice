import express from 'express';

const app = express();
const URL = 8000;


const datas = [
    {id:1,name:"Jayvee"},
    {id:2,name:"Louie"},
    {id:3,name:"Justine"},
]

//middleWare
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    //always include this method when write a middleware
    next();
})
/*below need nyan Kase si node hindi naman nakaka intindi
ng Json format lalo na pag nag bato si client ng data,
thus naka Json eh hindi mababasa ni node yon sa back end.
Good news is si express may prebuild na function para
every time na may apasok na json, mmaiintindihan na ni 
node yon at i2 yon = app.use(express.json());
*/
app.use(express.json());


//Get Data
app.get('/get',(req,res)=>{
    res.json({status:200,data:datas})
})

//Add Data



app.post('/push',(req,res)=>{

    let Datahere = false;
//Kaya ako nag set ng boolean dto kasi every time
//nag tutrue sa inclede,, puro multiple nag pupuck up
//e2 mas the best way para sakin
datas.forEach(element => {
   if(element.name.includes(req.body.name)){
      Datahere = !Datahere;
   }
});


if(Datahere){
    return res.json({message:"Name already here"})
 }else if(!req.body.name){
   return  res.json({status:400})
 }
const data = {
    // Why datas. length kasi dba need den ma add ng id
    //ang mang yayari is kukunin nya yung length thus plus 1
    id: datas.length,
    name:req.body.name
 }

     //Immutable way , trivia. immutable way code is you copy the
     //data first and then yo modify it unlike
     //mutable you modify directly the data
    //const array = [...datas,data];
//mutable this
    datas.push(data)
 
    return res.json({status:200})
})

app.listen(URL,()=>console.log(`Port ${URL} are working`))