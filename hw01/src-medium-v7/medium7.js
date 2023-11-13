function scoreClass(d) {
    if (d == 10) return "excellent-kid";
    else if (d >= 7) return "good-kid";
    else if (d >= 2) return "fair-kid";
    else return "poor-kid";
}

function scoreSvg(d) {
    if (d == 10) return "../src/svg10/52.svg";
    else if (d == 9) return "../src/svg10/51.svg";
    else if (d == 8) return "../src/svg10/42.svg";
    else if (d == 7) return "../src/svg10/41.svg";
    else if (d == 6) return "../src/svg10/32.svg";
    else if (d == 5) return "../src/svg10/31.svg";
    else if (d == 4) return "../src/svg10/22.svg";
    else if (d == 3) return "../src/svg10/21.svg";
    else if (d == 2) return "../src/svg10/12.svg";
    else if (d == 1) return "../src/svg10/11.svg";
    else if (d == 0) return "../src/svg10/01.svg";
    else return "../svg/00.svg";
}

d3.select("#div1")
    .append("table")
    .append("tr")
    .selectAll("td")
    .data([10,9,8,7,6,5,4,3,2,1,0])
    .enter()
    .append("td")
    .text(function(n,i){
        if(i<=10){
            return n;
        }
    })
    .attr("class", function (n, i) { 
        if (n == 10) return "excellent-kid"; 
        else if (n >= 7 ) return "good-kid"; 
        else if (n >= 2 ) return "fair-kid"; 
        else return "poor-kid";})
    .append("img")
    .attr("src", scoreSvg)

d3.text("../src/data.csv").then(function(data) {
    let csv = d3.csvParseRows(data);
    d3.select("#div2")
    .append("table")
    .selectAll("tr")
    .data(csv)
    .join("tr")
    .selectAll("td")
    .data(n => n)
    .join("td")
    .html((n, i) => {
        if (i == 4 && n != 'GitHub 帳號') {
            return '<a href="https://' + n + '.github.io/vis2023f/" target="_blank"><img src="https://' + n + '.github.io/vis2023f/hw00/me.jpg"></a>' + '<hr><a href="https://github.com/' + n + '/vis2023f/" target="_blank">' + n + '</a>';
        } else {
            return i == 0 || i == 2 || isNaN(n) ? n : '';
        }
    })
    .filter((d, i) => i > 2 && !isNaN(d) && d !== "")
    .attr("class", scoreClass)
    .append("img")
    .attr("src", scoreSvg)
});