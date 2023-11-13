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
    .attr("src", function(n,i){
        if(n==10){
            return "../src/svg10/52.svg";
        }
        else if(n==9){
            return "../src/svg10/51.svg";
        }
        else if(n==8){
            return "../src/svg10/42.svg";
        }
        else if(n==7){
            return "../src/svg10/41.svg";
        }
        else if(n==6){
            return "../src/svg10/32.svg";
        }
        else if(n==5){
            return "../src/svg10/31.svg";
        }
        else if(n==4){
            return "../src/svg10/22.svg";
        }
        else if(n==3){
            return "../src/svg10/21.svg";
        }
        else if(n==2){
            return "../src/svg10/12.svg";
        }
        else if(n==1){
            return "../src/svg10/11.svg";
        }
        else if(n==0){
            return "../src/svg10/01.svg";
        }
    })

d3.text("../src/data.csv", function(data){
    csv = d3.csv.parseRows(data);
    d3.select("#div2")
        .append("table")
        .selectAll("tr")
        .data(csv)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function(d){
            return d;
        })
        .enter()
        .append("td")
        .html(function(n,i){
            if(i==4 && n!='GitHub'){
                return '<a href="https://' + n + '.github.io/vis2023f/" target="_blank"><img src="https://' + n + '.github.io/vis2023f/hw00/me.jpg"></a>' + '<hr><a href="https://github.com/' + n + '/vis2023f/" target="_blank">' + n + '</a>';
            }
            else if(i==0 || i==2 || isNaN(n)){
                return n;
            }
        })
        .filter(function (n, i) { return (i > 2 && !isNaN(n) && n != ""); })
        .attr("class", function (n, i) { 
            if (n == 10) return "excellent-kid"; 
            else if (n >= 7 ) return "good-kid"; 
            else if (n >= 2 ) return "fair-kid"; 
            else return "poor-kid";})
        .append("img")
        .attr("src", function(n,i){
            if(n==10){
                return "../src/svg10/52.svg";
            }
            else if(n==9){
                return "../src/svg10/51.svg";
            }
            else if(n==8){
                return "../src/svg10/42.svg";
            }
            else if(n==7){
                return "../src/svg10/41.svg";
            }
            else if(n==6){
                return "../src/svg10/32.svg";
            }
            else if(n==5){
                return "../src/svg10/31.svg";
            }
            else if(n==4){
                return "../src/svg10/22.svg";
            }
            else if(n==3){
                return "../src/svg10/21.svg";
            }
            else if(n==2){
                return "../src/svg10/12.svg";
            }
            else if(n==1){
                return "../src/svg10/11.svg";
            }
            else if(n==0){
                return "../src/svg10/01.svg";
            }
        })
})