function _1(md){return(
md`# HW03 Strong Baseline (4pt)`
)}

function _data(FileAttachment){return(
FileAttachment("UserData-1.json").json()
)}

function _bgColor(Inputs){return(
Inputs.color({ label: "background color", value: "#dde6ee" })
)}

function _strokeColor(Inputs){return(
Inputs.color({ label: "stroke color", value: "#FFFFFF" })
)}

function _strokeOpacity(Inputs){return(
Inputs.range([0, 1], {
  step: 0.01,
  label: "stroke opacity"
})
)}

function _taiwan(taiwanMap){return(
taiwanMap(300, 260, -0.6, -0.7, 3500)
)}

function _taiwanMap(d3,topojson,tw,DOM,bgColor,strokeColor,strokeOpacity,count,thresholdScale){return(
(width, height, offsetX, offsetY, scale) => {
  offsetX = offsetX + 0.85;

  const bboxCenter = (bbox) => [
    (bbox[0] + bbox[2]) / 2 + offsetX,
    (bbox[1] + bbox[3]) / 2 + offsetY
  ];
  const projection = d3
    .geoMercator()
    .center(bboxCenter(topojson.bbox(tw)))
    .translate([width / 2, height / 2])
    .scale(scale);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", bgColor);

  const details = svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(tw, tw.objects.counties).features);

  svg
    .append("path")
    .datum(topojson.mesh(tw, tw.objects.counties, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", strokeColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 0.5)
    .attr("opacity", strokeOpacity)
    .attr("d", path);

  details
    .enter()
    .append("path")
    .attr("fill", (d) => {
      const Data = count.find(
        (t) =>
          t.val === d.properties.COUNTYNAME ||
          t.val.replace("　", "") === d.properties.COUNTYNAME
      );
      return Data ? thresholdScale(Data.count) : thresholdScale(0);
    })
    .attr("stroke", "gray")
    .attr("d", path);

  svg.append("g");

  return svg.node();
}
)}

function _thresholds(d3){return(
d3.range(0,43)
)}

function _colorRange(thresholds,d3){return(
thresholds.map(value => d3.interpolateReds(value / 42))
)}

function _thresholdScale(d3,thresholds,colorRange){return(
d3.scaleThreshold().domain(thresholds).range(colorRange)
)}

function _tw(d3){return(
d3.json("https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json")
)}

function _data_area(data){return(
data.map(row => row["LivingPlaceFirst"])
)}

function _area(){return(
[
  "基隆市",
  "新北市",
  "新竹市",
  "新竹縣",
  "桃園市",
  "臺中市",
  "臺北市",
  "臺東縣",
  "苗栗縣",
  "高雄市"
]
)}

function _count(area,data_area){return(
area.map(val => ({
  val: val,
  count: data_area.filter(v => v === val).length
}))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["UserData-1.json", {url: new URL("../json/UserData.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("viewof bgColor")).define("viewof bgColor", ["Inputs"], _bgColor);
  main.variable(observer("bgColor")).define("bgColor", ["Generators", "viewof bgColor"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeColor")).define("viewof strokeColor", ["Inputs"], _strokeColor);
  main.variable(observer("strokeColor")).define("strokeColor", ["Generators", "viewof strokeColor"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeOpacity")).define("viewof strokeOpacity", ["Inputs"], _strokeOpacity);
  main.variable(observer("strokeOpacity")).define("strokeOpacity", ["Generators", "viewof strokeOpacity"], (G, _) => G.input(_));
  main.variable(observer("taiwan")).define("taiwan", ["taiwanMap"], _taiwan);
  main.variable(observer("taiwanMap")).define("taiwanMap", ["d3","topojson","tw","DOM","bgColor","strokeColor","strokeOpacity","count","thresholdScale"], _taiwanMap);
  main.variable(observer("thresholds")).define("thresholds", ["d3"], _thresholds);
  main.variable(observer("colorRange")).define("colorRange", ["thresholds","d3"], _colorRange);
  main.variable(observer("thresholdScale")).define("thresholdScale", ["d3","thresholds","colorRange"], _thresholdScale);
  main.variable(observer("tw")).define("tw", ["d3"], _tw);
  main.variable(observer("data_area")).define("data_area", ["data"], _data_area);
  main.variable(observer("area")).define("area", _area);
  main.variable(observer("count")).define("count", ["area","data_area"], _count);
  return main;
}
