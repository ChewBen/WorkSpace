const fs =require('fs')

fs.readFile('./ a.md','utf-8',(err,text)=>{
    if(err){
        console.log(err)
        return
    }
    text=text.toUpperCase()
    
    console.log(text)
})