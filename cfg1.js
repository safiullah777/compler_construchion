var fs = require("fs");
const data = fs.readFileSync("output.txt", { encoding: "utf-8" }).split("\n\n\n")
const tokens = data
.slice(0,data.length-1)
.map((data) => {
  return JSON.parse(data);
});
let regexForId=str=>/^([a-zA-Z\_\$][a-zA-Z0-9\\d\$\_]*)$/g.test(str)
let regexForInt=str=>/^([\+\-]?)[0-9]+$/g.test(str)
// console.log(tokens);
var sstComplete=false;
var i=0;
var cp=()=>tokens[i]?.cp
var vp=()=>tokens[i]?.vp
var checkIndex=()=>i<tokens.length;
const variableTable=[{name:"a",type:"class",line:1}];
const insertVariable=(name,type)=>{
    var check=variableTable.filter((variable)=>variable.name==name)
    if(check[0]?.type=="class"){
        console.log(`${check[0]?.name} already declared as a class at line ${check[0]?.line}`);
        throw new Error("Something went badly wrong!");
        return false
    }
    if(check[0]?.type=="Id" && type=="class"){
        console.log(`${check[0]?.name} already declared as a variable at line ${check[0]?.line}`);
        return false
    }
    else if(check.length<1){
        variableTable.push({name,type})
    }
    console.log(variableTable);
}

const assign=()=>{
    if(inc_dec()){
        i++
        if(F1()){
            i++
            if(cp()===";"){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="String" || cp()=="boolean",cp()=="Number"){
        i++
        if(cp()===";"){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="!"){
        i++
        if(F()){
            i++
            if(cp()===";"){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="new"){
        i++
        if(cp()=="Id"){
            i++
            if(cp()=="("){
                i++
                if(PL()){
                    i++
                    if(cp()==")"){
                        i++
                        if(opt()){
                            i++
                            if(F2()){
                                i++
                                if(cp()===";"){
                                    return true
                                }
                                else{
                                    sstComplete=false
                                    return false
                                }
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if((cp()=="this" || cp()=="Id" )&& This()){
        //console.log("this hogaya assign me");
        i++
        if(cp()=="Id"){
            //console.log("assifn me this. k baad ID");
            i++
            if(opt()){
                //console.log("opt hogaya assign me");
                i++
                if(assign1()){
                    //console.log("assign1 hogaya assign me.");
                    return true
                }
                else{
                    //console.log("assign1 nahi hua assign me");
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        //console.log("assign shuru nahi hua 1111111111",sstComplete);
        return false
    }
}
const assign1=()=>{
    //console.log("Assign1");
    if(assign_op()){
        //console.log("assign op hogaya assign1 me");
        i++
        if(OE()){
            //console.log("assig1 me OE hoagyaaaaaaaaaaaaaaaaaaaaaa");
            i++
            if(cp()===";"){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(F2()){
        i++
        if(cp()===";"){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    else {
        sstComplete=false
        return false
    }
}

const assign_op=()=>{
    if(cp()=="=" || cp()=="CO"){
        return true
    }
    else{
        return false
    }
}
const opt=()=>{
    if(cp()=="."){
        //console.log("opt ka .",cp());
        i++
        if(cp()=="Id"){
            //console.log("opt ka .Id");
            i++
            if(opt()){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            //console.log("opt k id k sath . match nahi hua");
            sstComplete=false
            return false
        }
    }
    if(cp()=="["){
        //console.log("opt ka [");
        i++
        if(OE()){
            //console.log("opt ka [OE",cp());
           i++
           //console.log("opt ka [OE",cp());
           if(cp()=="]"){
            //console.log("opt ka [OE]");
               i++
               if(opt()){
                   return true
               }
               else{
                    sstComplete=false
                    return false
                }
           }
           else{
            sstComplete=false
            return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="("){
        //console.log("opt ka (",cp());
        i++
        if(PL()){
            //console.log("opt ka (PL",cp());
           i++
           if(cp()==")"){
                //console.log("opt ka (PL)");
               i++
               if(opt()){
                   return true
               }
               else{
                sstComplete=false
                return false
            }
           }
           else{
            sstComplete=false
            return false
        }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        //console.log("opt ka else tre k sath",cp(),i);
        return true
    }
}
// const expression=()=>{
//     if(cp()=="="||cp()=="CO"){
//         i++
//         if(OE()){
//             return true
//         }
//         return false
//     }
//     if(inc_dec()){
//         return true
//     }
//     return false
// }
const dec=()=>{
    //console.log("dec start")
    if(cp()=="var"){
        //console.log("dec k andar var",i,cp())
        i++
        if(cp()=="Id"){
            insertVariable(vp(),"var")
            //console.log("dec k andar var k andar Id",i,cp())
            i++
            if(init()){
                i++
                if(list()){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else return false
}
const init=()=>{
    if(cp()=="="){
         //console.log("init k andar =",i,cp())
        i++
        if(OE()){
            return true
        }
        else{
            return false
        }
    }
    else{
        i--
        return true
    }
}
const list=()=>{
    if(cp()==";"){
         //console.log("list k andar ;",i,cp())
        return true
    }
    if(cp()==","){
         //console.log("list k andar ,",i,cp())
        i++
        if(cp()=="Id"){
         //console.log("list k andar Id",i,cp())
            i++
            if(init()){
                i++
                if(list()){
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}









const inc_dec=()=>{
    if(cp()=="inc_dec")return true
    else {
       return false
    }
}
const This=()=>{
    if(cp()=="this"){
        i++
        if(cp()==".")return true
    }
    else{
        i--
        return true
    }
}
const OE=()=>{
    if(AE()){
        i++
        if(OE1()){
         //console.log("OE k OE1 me",cp(),i)
            return true
        }
    }
    else {
        sstComplete=false
        return false
    }
}
const OE1=()=>{
    if(vp()=="||"){
        i++
        if(AE()){
            i++
            if(OE1()){
                return true
            }
        }
    }
    else{
        //console.log("return OE1 me",cp())
        i--
        return true
    }
}
const AE=()=>{
    if(RE()){
        i++
        if(AE1()){
            return true
        }
    }
    else return false
}
const AE1=()=>{
    if(vp()=="&&"){
        i++
        if(RE()){
            i++
            if(AE1()){
                return true
            }
        }
    }
    else{
        //console.log("return AE1 me",cp())
        i--
        return true
    }
}
const RE=()=>{
    if(SE()){
        i++
        if(RE1()){
            return true
        }
        else return false
    }
    else return false
}
const RE1=()=>{
    if(cp()=="ROP"){
        i++
        if(SE()){
            i++
            if(RE1()){
                return true
            }
        }
    }
    else{
        //console.log("return RE1 me",cp())
        i--
        return true
    }
}
const SE=()=>{
    if(E()){
        i++
        if(SE1()){
            return true
        }
    }
    return false
}
const SE1=()=>{
    if(cp()=="SO"){
        i++
        if(E()){
            i++
            if(SE1()){
                return true
            }
            return false
        }
        return false
    }
    if(cp()=="="|| cp()=="CO"){
        return false
    }
    else{
        //console.log("return SE1 me",cp())
        i--
        return true
    }
}
const E=()=>{
    if(T()){
        //console.log("E k baad T",cp())
        i++
        if(E1()){
            //console.log(cp(),"jhh");
            return true
        }
    
    }
    else return false
}
const E1=()=>{
    if(cp()=="PM"){
        //console.log("E1 k andar PM",i)
        i++
        if(T()){
            i++
            if(E1())return true
        }
    }
    else{
        //console.log("E1 ka else",cp())
        i--
        return true
    }
}
const T=()=>{
    if(F()){
        //console.log("T k andar",cp())
        i++
        if(T1()){
            return true
        }
    }
    else return false
}
const T1=()=>{
    if(cp()=="MDM"){
        //console.log("MDM");
        i++
        if(F()){
            i++
            if(T1()){
                return true
            }
        }
    }
    else{
        i--
        //console.log("T1 ka else",cp())
        return true
    }
}
const F=()=>{
    if(inc_dec()){
        //console.log("F k andar inc_dec",i,cp(),vp())
        i++
        if(F1()){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="new"){
        //console.log("new in F");
        i++
        if(cp()=="Id"){
            //console.log("new a in F");
            i++
            if(cp()=="("){
        //console.log("new a( in F");
                i++
                if(PL()){
                    i++
        //console.log("new a(a in F next token is",cp());

                    if(cp()==")"){
        //console.log("new a() in F");
                        i++
                        if(opt()){
                            i++
                            if(F2()){
                                return true
                            }
                            else {
                                sstComplete=false
                                return false 
                            }
                        }
                        else {
                            sstComplete=false
                            return false 
                        }
                    }
                    else{
                        sstComplete=false;
                        return false
                    }
                }
                else{
                    sstComplete=false;
                    return false
                }
            }
            else{
                sstComplete=false;
                return false
            }
        }
        else{
            sstComplete=false;
            return false
        }
    }
    if(cp()=="Number" || cp()=="String" || cp()=="boolean") {
        //console.log("F k andar Number",i,cp())
        return true
    }
    if(vp()=="!"){
        i++
        if(F())return true
    }
    if(This()){
        i++
       if(cp()=="Id"){
           //console.log("id OE k f me");
           i++
           if(opt()){
               i++
               if(F2()){
                   return true
               }
               else{
                sstComplete=false
                return false
            }
           }
           else{
            sstComplete=false
            return false
        }
    }
    }
    else{
        //console.log("f ka else",cp());
        return false
    }
}
const F1=()=>{
    if(cp()=="new"){
        i++
        if(cp()=="Id"){
            i++
            if(cp()=="("){
                i++
                if(PL()){
                    i++
                    if(cp()==")"){
                        i++
                        if(cp()=="opt"){
                            return true
                        }
                        else {
                            sstComplete=false
                            return false 
                        }
                    }
                    else {
                        sstComplete=false
                        return false 
                    }
                }
                else {
                    sstComplete=false
                    return false 
                }
            }
            else {
                sstComplete=false
                return false 
            }
        }
        else {
            sstComplete=false
            return false 
        }
    }
    if(This()){
        i++
        if(cp()=="Id"){
            //console.log("this.id in f1");
            i++
            if(opt()){
                return true
            }
            else {
                sstComplete=false
                return false 
            }
        }
        else {
            sstComplete=false
            return false 
        }
    }
    else {
        sstComplete=false
        return false 
    }
}
const F2=()=>{
    // //console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    if(inc_dec()){
        return true
    }
    else{
        i--
        return true
    }
}
const Z=()=>{
    if(cp()=="."){
        //console.log("z k andar .",i,cp())
        i++
        if(cp()=="Id"){
        //console.log("z k andar . k aagy id",i,vp())
            i++
            if(R1()){
                return true    
            }
            else{
                //console.log("z false hogaya   aaaaaaaaaaaaa");
                sstComplete=false
                 return false
                }
        }
        else{
            sstComplete=true
             return false
            }
    }
    if(cp()=="["){
        //console.log("z k andar [ match",cp(),i);
        i++
        if(OE()){
            //console.log("z k andar [ k nadar number",cp(),i)
            i++
            if(cp()=="]"){
                //console.log("z k andar [ ka close ]",cp(),i)
                i++
                //console.log(R1());
                if(R1()) return true
                else return false
                    
            }
            else return false
        }
        else return false
    }
    if(cp()=="("){
        //console.log("( matched 2")
        i++
        if(PL()){
            i++
            if(cp()==")"){
                i++
                //console.log(") matched 2")
                if(R2()){
                    return true
                }
                else return false
            }
            else return false
            
        }
        else return false
    }
    if(X1()) return true
    else {
        i--
        //console.log("Z ka return",cp());
         return true
        }
        
    
}
var X1=()=>{
    return false
}
const R1=()=>{
    if(cp()=="."){
        //console.log("R1 me .");
        i++
        if(cp()=="Id"){
            i++
            if(Z()){
                // ////console.log("z yahan call hua")
                return true
            }
        }
    }
    if(cp()=="["){
        //console.log("R1 me [");
        i++
        //console.log(OE());
        if(OE()){
            //console.log("z k andar [ k nadar number")
            i++
            if(cp()=="]"){
                i++
                if(Z()) return true
            }
            else return false
        }
        else{
            return false
        }
    }
    if(cp()=="("){
        //console.log("( matched 3")
        i++
        if(PL()){
            i++
            if(cp()==")"){
                //console.log(") matched 3")
                i++
                    if(Z()){
                        return true
                    }
                    else return false
            }
            else return false
        }
        else return false
    }
    else{
        i--
        //console.log("R1 ka else",cp())
        return true
    }
}
const R2=()=>{
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(B()){
                return true
            }
        }
    }
    else{
        i--
        return true
    }
}
const B=()=>{
    if(Z2()){
        return true
    }
    if(Xd()){
        return true
    }
}
const Z2=()=>{
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(R1d()){
                return true
            }
        }
    }
    if(cp()=="["){
        i++
        if(cp()=="Number" || cp()=="Id"){
        //console.log("z k andar [ k nadar number")
            i++
            if(cp()=="]"){
        ////console.log("z k andar [ ka close ]")
                i++
                if(cp()=="."){
        ////console.log("z k andar [1] k baad .")
                    i++
                    if(cp()=="Id"){
                        if(R1d()) return true
                    }
                }
            }
        }
    }
    if(cp()=="("){
        ////console.log("( matched 4")
        i++
        if(PL()){
            i++
            if(cp()==")"){
        ////console.log(") matched 4")
                i++
                if(R1d()){
                    return true
                }
            }
        }
    }
    else{
        i--
        return true
    }


}
const R1d=()=>{
    if(cp()=="."){
        i++
        if(cp()=="Id"){
            i++
            if(Z2()){
                return true
            }
        }
    }
}





const PL=()=>{
    //console.log("pl")
    if(OE()){
        //console.log("OE pl me 111111111111111111111111111111")
        i++
        if(PL1()){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    else 
    // if(sstComplete)
    {
        i--
        //console.log("PL return ",cp(),sstComplete);
        return true
    }
    // else{
    //     //console.log("pl ka else with fals");
    //     return false
    // }

}
const PL1=()=>{
    if(cp()==","){
        //console.log("pl1 me ,");
        i++
        if(OE()){
            i++
            if(PL1()){
            return true
            }
        }
    }
    else{
        i--
        return true
    }
}
const param=()=>{
    if(cp()=="Id"){
        //console.log("param Id",cp());
        i++
        if(P1()){
            return true
        }
    }
    else{
        //console.log("param empty",cp(),i);
        i--
        return true
    }
}
const P1=()=>{
    if(cp()=="="){
        //console.log("id=");
        i++
        if(OE()){
            //console.log("id=OE");
            i++
            if(P2()){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
             sstComplete=false
             return false
            }
    }
    if(P2()){
        return true
    }
}
const P2=()=>{
    if(cp()==","){
        //console.log("id,");
        i++
        if(cp()=="Id"){
            //console.log("id=id");
            i++
            if(P1()){
                return true
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}






const IF_ELSE=()=>{
    if(cp()=="if"){
        //console.log("if");
        i++
        if(cp()=="("){
            //console.log("if(");
            i++
            if(OE()){
                //console.log("if(OE",cp(),i,vp());
                i++
                if(cp()==")"){
                    //console.log("if(OE)")
                    i++
                    if(body1()){
                        i++
                        if(ELSE_IF()){
                            return true
                        }
                    }
                    else {
                        sstComplete=false
                        return false
                    }

                }
            else {
                //console.log(") if ka not accpeted");
            sstComplete=false
            return false
        }
            }
        else {
            sstComplete=false
            return false
        }
        }
        else{
            sstComplete=false 
            return false
        }
    }
    else return false
}
const body=()=>{
    if(cp()=="{"){
        //console.log("body ka {",cp())
        i++
        if(MST()){
            //console.log("P{{{{{{{{{{",cp())
            return true
        }
    }
    return false
}
const body1=()=>{
    //console.log("body 1 started");
    if(cp()==";"){
        return true
    }
    if(SST()){
        return true
    }
    if(body()){
        i++
        if(cp()=="}"){
            //console.log("sssnsnsnsnsnsns1",cp())
            return true
        }
        else {
            sstComplete=false
            return false
        }
    }
    else{
        sstComplete=false
        return false
    }
}
const ELSE_IF=()=>{
    if(cp()=="else"){
        //console.log("else if ka else",cp())
        i++
        if(ELSE_IF1()){
        //console.log("else if ka else if1",cp())
            return true
        }
        else{
            sstComplete=false
             return false
            }
    }
    // else if(!sstComplete){
    //     // i--
    //     return false
    // }

    else{
        i--
        return true
    }
}
const ELSE_IF1=()=>{
    if(IF_ELSE()){
        //console.log("else if1 ka if else",cp())
        return true
    }
    if(body1()){
        //console.log("else if1 ki body",cp())
        return true
    }
    else return false
}

const SST=()=>{
    //console.log("sst ka shuru check sst complete",cp(),sstComplete);
    if(sstComplete && FOR()){
        return true
    }
    if(sstComplete && IF_ELSE()){
        //console.log("if done in sst");
        return true
    }
    if(sstComplete && DO_WHILE()){
        return true
    }
    if(sstComplete && WHILE()){
        //console.log("while done in sst");
        return true
    }
    if(sstComplete && dec()){
        //console.log("dec done in sst");
        return true
    }
    if(sstComplete && assign()){
        //console.log("assign done in sst",sstComplete);
        return true
    }
    if(sstComplete && CLASS()){
        //console.log("class done in sst",sstComplete);
        return true
    }

    // if(CONTINUE()){
    //     return true
    // }
    // if(BREAK()){
    //     return true
    // }
    if(sstComplete && Return()){
        return true
    }
    if(sstComplete && FUNCTION()){
        //console.log("fucntion done in sst");
        return true
    }
    // if(SWITCH()){
    //     return true
    // }
    else{
        //console.log("sst ka else",cp(),sstComplete);
        return false
    }
}
const MST=()=>{
    sstComplete=true
    if(SST()){
        //console.log("mst me sst hogaya",cp(),i);
        i++
        if(MST()){
            //console.log("mst doneeeeeeeeeeeee",sstComplete);
            return true
        }
    }
    else if(!sstComplete){
       //console.log("mst ka else with sst not completed",cp(),sstComplete);
       return false
   }
   else{
       //console.log("mst ka else sst hogaya");
       i--
       return true
   }
    
}
// const MST1=()=>{
//     sstComplete=true
//     if(SST()){
//         //console.log("mst me sst hogaya1");
//         i++
//         if(MST1()){
//             return true
//         }
//     }
//    else if(!sstComplete){
//        //console.log("mst1 ka else !sstcomplete");
//        return false
//    }
//    else{
//        //console.log("mst1 ka else");
//        return true
//     }
// }

const K=()=>{
    if(Z()){
        return true
    }
    if(cp()=="="){
        i++
        if(OE()){
            return true
        }
    }
}
const WHILE=()=>{
    if(cp()=="while"){
        //console.log('while')
        i++
        if(cp()=="("){
        //console.log('while(')
            i++
            if(OE()){
        //console.log('while(OE')
                i++
                if(cp()==")"){
                //console.log("while(OE)")
                    i++
                    if(body1()){
                        //console.log("body1 in while");
                        return true
                    }
                    else{
                         sstComplete=false
                         return false
                    }
                }
                else{
                    sstComplete=false
                    return false
               }
            }
            else{
                sstComplete=false
                return false
           }
        }
        else{ 
            sstComplete=false
            return false
        }
        
    }
    else{
        return false
   }
}
const DO_WHILE=()=>{
    if(cp()=="do"){
        //console.log("do");
        i++
        if(body1()){
            //console.log("do{}",cp());
            i++
            if(cp()=="while"){
                //console.log("do{}while",cp());
                i++
            if(cp()=="("){
                //console.log("do{}while(");
                i++
                if(OE()){
                    //console.log("do{}while(a");
                    i++
                    if(cp()==")"){
                        //console.log("do{}while(a)");
                        return true
                    }
                    else{
                        sstComplete=false
                        return false
                   }
                }
                else{
                    sstComplete=false
                    return false
               }
            }
            else{
                sstComplete=false
                return false
           }
        }
        else{
            sstComplete=false
            return false
       }
    }
    else{
        sstComplete=false
        return false
    }
    }
    else{
        return false
   }
}
const FUNCTION=()=>{
    if(cp()=="function"){
        //console.log("function");
        i++
        if(cp()=="Id"){
            //console.log("function a");
            i++
            if(cp()=="("){
                //console.log("function a(");
                i++
                if(param()){
                    //console.log("function a(a,b",cp(),i);
                    i++
                    if(cp()==")"){
                        //console.log("function a(a,b)",cp(),i);
                        i++
                        if(cp()=="{"){
                            //console.log("function a(a,b){");
                            i++
                            if(MST()){
                                i++
                                if(cp()=="}"){
                                    //console.log("function a(a,b){}");
                                    return true
                                }
                                else sstComplete=false
                            }
                            else sstComplete=false
                        }
                        else sstComplete=false
                    }
                    else sstComplete=false
            }
            else sstComplete=false
        }
        else sstComplete=false
    }
    else sstComplete=false
}
else{
    return false
}
}
const c1=()=>{
    if(cp()==";"){
        //console.log(cp(),";;;;;;;;;;;;;;;;;");
        return true
    }
    if(dec()){
        return true
    }
    if(assign()){
        return true
    }
}
const c2=()=>{
    if(OE()){
        return true
    }
    else{
        i--
        return true
    }
}
const c3=()=>{
    if(inc_dec()){
        i++
        if(F1()){
           return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="String" || cp()=="boolean",cp()=="Number"){
        return true
    }
    if(cp()=="!"){
        i++
        if(F()){
            return true
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="new"){
        i++
        if(cp()=="Id"){
            i++
            if(cp()=="("){
                i++
                if(PL()){
                    i++
                    if(cp()==")"){
                        i++
                        if(opt()){
                            i++
                            if(F2()){
                                return true
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if((cp()=="this" || cp()=="Id" )&& This()){
        //console.log("this hogaya assign me");
        i++
        if(cp()=="Id"){
            //console.log("assifn me this. k baad ID");
            i++
            if(opt()){
                //console.log("opt hogaya assign me");
                i++
                if(assign_op()){
                    i++
                    if(OE()){
                        return false
                    }
                    else{
                        //console.log("assign1 nahi hua assign me");
                        sstComplete=false
                        return false
                    }
                }
                if(F2()){
                    return true
                }
                else{
                    //console.log("assign1 nahi hua assign me");
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const FOR=()=>{
    if(cp()=="for"){
        //console.log("for",cp(),i);
        i++
        if(cp()=="("){
            //console.log("for(",cp());
            i++
            if(c1()){
                //console.log("for(var a=10;)",cp());
                i++
                if(c2()){
                    //console.log("for(a=10;a<10)",cp());
                    i++
                    if(cp()==";"){
                        //console.log("for(a=10;a<10;)",cp());
                        i++
                        if(c3()){
                            //console.log("for(a=10;a<10;a++",cp());
                            i++
                            if(cp()==")"){
                                //console.log("for(a=10;a<10;a++)",cp());
                                i++
                                if(body1()){
                                   return true
                                }
                                else{
                                    sstComplete=false
                                    return false
                                }
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        return false
    }
}
const CLASS=()=>{
    //console.log("class me enter");
    if(cp()=="class"){
        //console.log("class",cp());
        i++
        if(cp()=="Id"){
            insertVariable(vp(),"class")
            //console.log("class Id ",cp());
            i++
            if(Extend()){
                //console.log("class entends id",cp());
                i++
                //console.log("class entends id",cp());
                    if(Class_Body()){
                        //console.log("Class body done mean class done");
                        return true
                    }
                    else{
                        sstComplete=false
                        return false
                    }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            //console.log("class ki id match nahi hi",cp(),sstComplete);
            return false
        }
    }
    return false
}
const Extend=()=>{
    //console.log("extends me agye", cp());
    if(cp()=="extends"){
        i++
        //console.log("extends matched hone k baad ",cp());
        if(cp()=="Id"){
            return true
        }
        else{
            //console.log("Id may");
            sstComplete=false
            return false
        }
    }
    else{
        //console.log("extend else return true");
        i--
        return true
    }
}
const Class_Body=()=>{
    //console.log("class body me enter",cp());
    if(cp()=="{"){
        //console.log("class body ka {",cp());
        i++
        if(Statement()){
            i++
            if(Constructor()){
                i++
                if(Statement()){
                    i++
                    if(cp()=="}"){
                        return true
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        sstComplete=false
        return false
    }
}
const Statement=()=>{
    if(cp()==";"){
        return true
    }
    if(cp()=="Id"){
        i++
        if(Statement1()){
            return true
        }
        else{
            sstComplete=false
            return false
        }        
    }
    else{
        i--
        return true
    }
}
const Statement1=()=>{
    if(cp()=="("){
        i++
        if(param()){
            i++
            if(cp()==")"){
                i++
                if(cp()=="{"){
                    i++
                    if(MST()){
                        i++
                        if(cp()=="}"){
                            i++
                            if(Statement()){
                                return true
                            }
                            else{
                                sstComplete=false
                                return false
                            }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    if(cp()=="="){
        i++
        if(OE()){
            i++
            if(cp()==";"){
                i++
                if(Statement()){
                    return true
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const Constructor=()=>{
    if(cp()=="constructor"){
        i++
        if(cp()=="("){
            i++
            if(param()){
                i++
                if(cp()==")"){
                    i++
                    if(cp()=="{"){
                        i++
                        if(MST()){
                            i++
                            if(cp()=="}"){
                            return true
                        }
                        else{
                            sstComplete=false
                            return false
                    }
                        }
                        else{
                            sstComplete=false
                            return false
                        }
                    }
                    else{
                        sstComplete=false
                        return false
                    }
                }
                else{
                    sstComplete=false
                    return false
                }
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        i--
        return true
    }
}
const Return=()=>{
    if(cp()=="return"){
        i++
        if(OE()){
            i++
            if(cp()==";"){
                return true
            }
            else{
                sstComplete=false
                return false
            }
        }
        else{
            sstComplete=false
            return false
        }
    }
    else{
        return false
    }
}
const MAIN=()=>{
    if(vp()=="MAIN"){
        i++
        if(cp()=="("){
            i++
            if(cp()==")"){
                i++
                if(cp()=="{"){
                    i++
                    //console.log("jeje");
                    if(MST()){
                        i++
                        //console.log("hello");
                        if(cp()=="}"){
                            return true
                        }
                        return false
                    }
                    return false
                }
                return false
            }
            return false
        }
        return false
    }
    else return false
}
console.log(MAIN())
// console.log(variableTable);