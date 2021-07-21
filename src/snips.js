let r=Array.from(document.getElementsByClassName("ext-evt-bd"))
  .map(e => e.textContent)
  .filter(e => !e.includes("  Adjustment"))
  .filter(e => !e.includes("  Jtech"))
  .filter(e => !e.includes("  Lunch"))
  .filter(e => !e.includes("  Payment"))
  .filter(e => !e.includes("  Spot Checks"))
  .filter(e => !e.includes("  Make up visit"))
  .filter(e => !e.includes("  Financials Only-Already reviewed results"))
  .filter(e => !e.includes("  Shock Wave"))
  .map(e => e.replace(/  +/, "|"))
  .map(e => e.trim())
  .map(e => e.replace(/(?<=\d\d..) /, "|"))
  .map(e => e.split("|"))
  .map(e => {
    e[0] = e[0].replace("am", " AM");
    return e;
  })
  .map(e => {
    e[0] = e[0].replace("pm", " PM");
    return e;
  });
function compare(d1,d2){
//+ if d1>d2(after)
    
    if(d1.includes("12:")){d1.includes("P")?d1=d1.replace("P", "A"):d1=d1.replace("A", "P")}
    if(d2.includes("12:")){d2.includes("P")?d2=d2.replace("P", "A"):d2=d2.replace("A", "P")}
    if(d1[d1.length-2]!=d2[d2.length-2]){if (d1[d1.length-2]=='P'){return 1}; return -1;}
    d1=Number(d1.replace(":","").replace(/ ../,""));
    d2=Number(d2.replace(":","").replace(/ ../,""));
    if (d1>d2){return 1}
    if (d2>d1){return -1}
    return 0;
    
}
copy(JSON.stringify(r.sort((e,b)=>{return compare(e[0],b[0])})))


let inn=[["8:30 AM","Murray, John","Est Pt: FCE"],["9:00 AM","Hodges, Kadie","2nd Visit"],["10:00 AM","Daniel, Selena","Neuropathy 2nd Visit"],["10:00 AM","Goggins, Caroline","Est Pt: FCE"],["10:30 AM","Eiland, Cara","RANDOM EXAM/ RESTART"],["11:00 AM","Blair, Anthony","Neuropathy Initial Visit"],["2:00 PM","Coker, Phyllis","Neuropathy Initial Visit"],["3:00 PM","Wright, Andrea","New Pt: Exam"],["3:30 PM","Seegar, Earl","2nd Visit"],["3:30 PM","Stoneback, Mickey","New Pt: Exam"],["4:00 PM","Clark, Cheryl","New Pt: Exam"],["4:30 PM","Hallman, Belinda","Est Pt: FCE"],["4:30 PM","Jacobs, Terri","Est Pt: FCE"],["4:30 PM","Campbell, Michael","2nd Visit"],["4:30 PM","Holston, Kathleen","New Pt: Exam"],["5:00 PM","Singleton, Naquan","2nd Visit"],["5:00 PM","Banks, Chris","New Pt: Exam"],["5:15 PM","Tillman, Morgan","Est Pt: FCE"]]

document.getElementById("patient-template").content.querySelectorAll(".time").forEach((e)=>{e.parentNode.removeChild(e)})
document.getElementById("patient-template").content.querySelectorAll(".room").forEach((e)=>{e.parentNode.removeChild(e)})
document.getElementById("patient-template").content.querySelectorAll(".dr").forEach((e)=>{e.parentNode.removeChild(e)})
document.getElementById("patient-template").content.querySelectorAll(".remove").forEach((e)=>{e.parentNode.removeChild(e)})
document.querySelectorAll(".time").forEach((e)=>{e.parentNode.removeChild(e)})
document.querySelectorAll(".room").forEach((e)=>{e.parentNode.removeChild(e)})
document.querySelectorAll(".dr").forEach((e)=>{e.parentNode.removeChild(e)})
document.querySelectorAll(".EX").forEach((e)=>{e.parentNode.removeChild(e)})
Array.from(document.styleSheets[0].rules).forEach((rule,index)=>{if(rule.selectorText=="th.apt-timet"){console.log(rule.style.setProperty("width","20%"))}})

for (let i=0;i<inn.length;i++){
let id="pt-"+i;
    pNameToElm(inn[i][1],id);
    let e=document.getElementById(id)
    e.getElementsByClassName("pt-type")[0].value=inn[i][2];
    e.getElementsByClassName("apt-time")[0].value=inn[i][0];
}