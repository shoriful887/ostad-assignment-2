const http= require('http');
const fs= require('fs');
var express= require('express');
var multer=require('multer');
const SERVER_PORT= 5500;

const Server= http.createServer(function (req, res){
    if(req.url=='/'){
        res.end("This is Home Page");
    }
    else if (req.url=='/about'){
        res.end("This is About Page");
    }
    else if (req.url=='/contact'){
        res.end("This is Contact Page");
    }    
    else if (req.url=='/file-write'){
        fs.writeFile('demo.txt','Hello World',(err)=>{
            if(err){
                res.end("File Write Failed");
            }
            else{
                res.end("File Created");
            }
        });        
    }       
    else if (req.url=='/file-upload'){
        const storage= multer.diskStorage({
            destination: (req,file,cb)=>{
                cb(null,'./uploads');        
            },
            filename: (req,file,cb)=>{
                cb(null,file.originalname);
            }
        });            
        const upload=multer({storage:storage}).single('myfile');        
            upload(req,res,function(err){
                if(err){
                    res.end("Error Occurs on File Upload");                           
                    }
                    else{
                    res.end("File Upload Success");                
                    }
                })    
            }  
        else{
            res.writeHead(404,{'Content-type': 'text/html'});            
            res.end("Requested URL Not Found | ERROR 404");
        }    
    });
Server.listen(SERVER_PORT, function(){
    console.log(`Server Running on port ${SERVER_PORT}`);
});