function _1(md){return(
md`# HW2 Strong Baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _c_array(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _ytemp(){return(
[]
)}

function _5(ytemp,c_array,data)
{
  ytemp.length = 0;
  for (var y=0; y<12; y++) { 
    ytemp.push({Constellation:c_array[y],Constellation_num:y, gender:"男", count:0}); 
    ytemp.push({Constellation:c_array[y],Constellation_num:y, gender:"女", count:0});
  }
  data.forEach (x=> {
    var i = (x.Constellation-0)*2 + (x.Gender== "男" ? 0 : 1); 
    ytemp[i].count++;
  })
  return ytemp
}


function _6(Plot,ytemp){return(
Plot.plot({
  grid: true,
  x:{domain:["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]},
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(ytemp, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _ytemp2(data,c_array){return(
data.map(d => ({
  LPF:d.LivingPlaceFirst,
  ...d,
  C_Name: c_array[d.Constellation],
  Gender: d.Gender
}))
)}

function _8(Plot,c_array,ytemp2){return(
Plot.plot({
  x: {grid: true, label: "Constellation", ticks: 11, tickFormat: (d) => c_array[d]},
  y: {grid: true, label: "Count"},
  marks: [
    Plot.rectY(ytemp2,Plot.binX({y: "Count"},{x: "Constellation",fill: "Gender",title:  
          (d)=>`Constellation:${d.C_Name}\nGender: ${d.Gender}`,interval: 1,tip: true}))]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("c_array")).define("c_array", _c_array);
  main.variable(observer("ytemp")).define("ytemp", _ytemp);
  main.variable(observer()).define(["ytemp","c_array","data"], _5);
  main.variable(observer()).define(["Plot","ytemp"], _6);
  main.variable(observer("ytemp2")).define("ytemp2", ["data","c_array"], _ytemp2);
  main.variable(observer()).define(["Plot","c_array","ytemp2"], _8);
  return main;
}
