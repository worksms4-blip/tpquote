
function downloadPDF(){

const element =
document.querySelector(
".page"
);

const quotationNo =
document.getElementById(
"quotationNo"
)?.innerText || "quotation";

const options = {

margin:0,

filename:
quotationNo + ".pdf",

image:{
type:"jpeg",
quality:1
},

html2canvas:{
scale:3,
useCORS:true
},

jsPDF:{
unit:"mm",
format:"a4",
orientation:"portrait"
}

};


html2pdf()
.set(options)
.from(element)
.save();

}
