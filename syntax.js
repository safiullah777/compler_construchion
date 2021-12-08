var fs=require('fs')
const data = fs.readFileSync("output.txt", { encoding: "utf-8" }).split("\n")
const tokens =data.slice(0,data.length-1).map(data=>{
    return JSON.parse(data)
})
var DT=['var','const','let'];
var i=0;
const declaration =(newtoken)=>{
    if(DT.includes(newtoken.valuepart)){
        i++
        if(tokens[i].classpart=="Id"){
            console.log(1);
        }
    }
}
declaration(tokens[i])
