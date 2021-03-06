let regexForInt=str=>/^([\+\-]?)[0-9]+$/g.test(str)
let regexForFloat=str=>/^([\+\-]?)[0-9]*\.[0-9]+$/g.test(str)
let regexForId=str=>/^([a-zA-Z\_\$][a-zA-Z0-9\\d\$\_]*)$/g.test(str)
let fs = require("fs");
const data = fs.readFileSync("words.txt", { encoding: "utf-8" }).split("\n");
const {operators,punctuators,breaks,keywords}=require('./breakers.js')
var two="";
var three="";
var checkThree;
var checkTwo;
var splits=[]
let stringOpen = false;
let backtickString=false
var uploadToken=(str,lineNo,cp)=>splits.push({vp:str,cp:cp?cp:"",lineNo})
const compare=(data,toCompareWith)=>data.vp==toCompareWith
var temp=""
data.forEach((line,lineNo)=>{
    ++lineNo
    if(!backtickString){
    temp="";
    }
    for (let i= 0; i<line.length; i++) {
        // console.log(line[i])
        if(line[i]=='"' && !stringOpen && !backtickString){
            stringOpen=true;
          }
         
          else if (stringOpen && i==line.length-1 && line[i]!=='"' ){
            temp+=line[i]
            // words.push({word:temp,lineNo,cp:'invalid token'})
            uploadToken(temp,lineNo,"invalid token");
            stringOpen=false
            temp=""
          }
          else if(stringOpen && line[i]!='"'){
            temp+=line[i];
          }
          else if(line[i]=='"'&& stringOpen){
            if(line[i-1]!=="\\" ){
            stringOpen=false;
            // words.push({word:temp,lineNo,cp:"String"})
            uploadToken(temp,lineNo)
            temp=""
            }
            else{
              temp=temp.slice(0,temp.length-1)
              temp+=line[i]
            }
          }
          else if(line[i]=="`" && !backtickString && !stringOpen ){
            uploadToken(temp,lineNo)
            temp=""
            backtickString=true
          }
          else if (backtickString && line[i]!='`'){
            temp+=line[i]
             if(lineNo==data.length-1 && i==line.length-1){
                uploadToken(temp,lineNo,"invalid token");
              }
          }
          else if(line[i]=='`'&& backtickString){
            if(line[i-1]!=="\\"){
            backtickString=false;
            uploadToken(temp,lineNo,"String")
            temp=""
            }
            else{
              temp=temp.slice(0,temp.length-1)
              temp+=line[i]
            }
          }
          else if (line[i]+line[i+1]=="//" && !stringOpen){
            i=line.length-1
            }
          else{
        temp+=line[i]
        if(breaks.includes(line[i]) || breaks.includes(line[i+1])){
            uploadToken(temp,lineNo)
            temp=""
        }
        else if(i==line.length-1){
            uploadToken(temp,lineNo)
            temp=""
        }
    }
    // }
}
})
splits.forEach((data,i)=>{
    two=data?.vp+splits[i+1]?.vp
    three=data?.vp+splits[i+1]?.vp+splits[i+2]?.vp
    checkTwo=operators.includes(two)
    checkThree=operators.includes(three)
    if(checkThree){
        data.vp=three
        splits.splice(i+1,2)
    }
    else if(checkTwo){
        data.vp=two
        splits.splice(i+1,1)
    }
})
for(var i=0;i<splits.length;i++){
        if(splits[i].vp==" " || splits[i].vp=="\t"){
        splits.splice(i,1);
        i--
    }
}
splits.forEach((data,i)=>{
    if(data.vp=="." && splits[i+1]?.vp>=0 && data.lineNo==splits[i+1].lineNo){
        data.vp=data.vp+splits[i+1].vp
        splits.splice(i+1,1);
    }

})
splits.forEach((data,i)=>{
  if(data.vp.includes('.') && data.vp>=0 && splits[i-1]?.vp>=0 && data.lineNo==splits[i-1].lineNo ){
      splits[i-1].vp=splits[i-1]?.vp+data.vp
      splits.splice(i,1)
    }
})
splits.forEach((data,i)=>{
    if(data.cp==""){
        if(compare(data,"true") || compare(data,"false") ) data.cp="boolean"
        else if(compare(data,"++")||compare(data,"--")) data.cp="inc_dec"
        else if(compare(data,"=")) data.cp="="
        else if(compare(data,"*")||compare(data,"/")||compare(data,"%")) data.cp="MDM"
        else if(compare(data,"+")||compare(data,"-")) data.cp="PM"
        else if(compare(data,"!")) data.cp="!"
        else if(compare(data,"<=")||compare(data,">=")||compare(data,"==")||compare(data,"!=")||compare(data,">")||compare(data,"<")||compare(data,"!==")||compare(data,"===")) data.cp ="relational operator"
        else if(compare(data,"+=")||compare(data,"-=")||compare(data,"/=")||compare(data,"*=")||compare(data,"%=")) data.cp="assignment operator"
        else if(compare(data,"||") || compare(data,"&&") ) data.cp="logical operator"
        else if(regexForFloat(data.vp)||regexForInt(data.vp)) data.cp="Number"
        else if(punctuators.includes(data.vp) || keywords.includes(data.vp)) data.cp=data.vp
        else if(regexForId(data.vp)) data.cp="Id"

    }
})
fs.writeFileSync('output.txt','')
splits.forEach(data=>{
    fs.appendFileSync('output.txt',JSON.stringify({vp:data.vp,cp:data.cp,lineNo:data.lineNo}))
    fs.appendFileSync('output.txt',"\n")
    fs.appendFileSync('output.txt',"\n")
    fs.appendFileSync('output.txt',"\n")
})

console.log(splits);
