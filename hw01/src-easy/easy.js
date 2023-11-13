let csv_data = new Array(121);
for(var i=0;i<121;i++){
    csv_data[i] = new Array(14);
}
csv_data[0] = ['序號', '班級', '學號', '姓名', 'GitHub', '作業一', '作業二', '作業三', '作業四', '作業五', '作業六', '作業七', '作業八', '作業九', '作業十'];
const class_temp = ['資工系','資工所','電資AI','電資資安','創新AI'];
const ID_temp1 = ['111', '112'];
const ID_temp2 = ['590', '598', 'C52', 'C53', 'C71'];
var rows = document.getElementsByTagName('tr');
for(var i=1;i<=120;i++){
    //class
    r1 = Math.floor(Math.random() * class_temp.length);
    csv_data[i][1] = class_temp[r1];
    //ID
    const r2 = ID_temp1[Math.floor(Math.random() * ID_temp1.length)];
    const r3 = ID_temp2[Math.floor(Math.random() * ID_temp2.length)];
    const r4 = (Math.floor(Math.random() * 999) + 1).toString().padStart(3, '0');
    csv_data[i][2] = `${r2}${r3}${r4}`;
    csv_data[i][3] = String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00)) +
    String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00)) +
    String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00));
    csv_data[i][4] = (Math.random() + 1).toString(36).substring(2);
    for(var j=5;j<csv_data[0].length;j++){
        csv_data[i][j] = Math.floor(Math.random() * 10);
    }
}
//sort
let header = csv_data.shift();
csv_data.sort((a, b) => {
    let classIndexA = class_temp.indexOf(a[1]);
    let classIndexB = class_temp.indexOf(b[1]);
    return classIndexA - classIndexB;
});
csv_data.unshift(header);
for(var i=1;i<=120;i++){
    csv_data[i][0] = i;
}

let table = document.createElement('table');
for (let row of csv_data) {
    table.insertRow();
    for (let cell of row) {
        let newCell = table.rows[table.rows.length - 1].insertCell();
        newCell.textContent = cell;
    }
}

document.body.appendChild(table);

function CreateCSV() {
    var csv_data = [];
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].querySelectorAll('td,th');
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
    }
    csv_data = csv_data.join('\n');
    downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });
    var temp_link = document.createElement('a');
    temp_link.download = "data.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}