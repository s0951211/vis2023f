function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _4(md){return(
md`星座名稱`
)}

function _constellationName(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _7(yCounts,constellationName,data)
{
  yCounts.length = 0; //將yCounts清空
  for (var y=0; y<constellationName.length; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({constellation:constellationName[y], gender:"男", count:0}); 
    //Object包含：1. 星座，2.男性，3.人數(設為0)
    yCounts.push({constellation:constellationName[y], gender:"女", count:0}); 
    //Object包含：1. 星座，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation*2) + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個星座的人
  })
  return yCounts
}


function _8(md){return(
md`# bar chart 呈現每個星座的人數`
)}

function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _10(Plot,plot2,constellationName,yCounts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  // domain: 定義x軸的數值範圍，指定 x 軸上的刻度所對應的值
  x: {label: "Constellation", domain: constellationName},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "constellation", y: "count", tip: true , fill:"gender"})
  ], 
})
)}

function _11(md){return(
md`# histogram`
)}

function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _13(Plot,plot1,data,constellationName){return(
Plot.plot({  

	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,  
  
	y: {grid: true, label: "count"},  
  x: {label: "Constellation"},
	marks: [    
    Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true,
       title: (d,i) => `Constellation: ${constellationName[d.constellation]}, \nGender: ${d.Gender}:`})),
    Plot.axisX({
      tickFormat: d => {
        return constellationName[d]; 
      },
      ticks:12    // 調整坐標軸上刻度的數量為12
    }),
    Plot.ruleY([0]),
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("constellationName")).define("constellationName", _constellationName);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer()).define(["yCounts","constellationName","data"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","constellationName","yCounts"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","data","constellationName"], _13);
  return main;
}
