var fs=require('fs')
const data = fs.readFileSync("output.txt", { encoding: "utf-8" }).split("\n")
const tokens =data.slice(0,data.length-1).map(data=>{
    return JSON.parse(data)
})
console.log(tokens)