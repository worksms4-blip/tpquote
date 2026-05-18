
const SHEET_ID =
"1DhzsH-NZDmlo6uhasfNjQVda4FHHTLAxAtuf1PfaJcQ";


const SHEETS = {

main:
`https://opensheet.elk.sh/${SHEET_ID}/Sheet1`,

charges:
`https://opensheet.elk.sh/${SHEET_ID}/Charges`

};


let products = [];


async function loadPrices(){

try{


const mainResponse =
await fetch(
SHEETS.main
);

const mainData =
await mainResponse.json();


const chargesResponse =
await fetch(
SHEETS.charges
);

const chargesData =
await chargesResponse.json();


products = [

...mainData,
...chargesData

];


console.log(
"All Products:",
products
);


initializeDefaultRows();


}catch(error){

console.error(error);

alert(
"Failed to load Google Sheet data"
);

}

}


function initializeDefaultRows(){

document.getElementById(
"panelContainer"
).innerHTML = "";

document.getElementById(
"inverterContainer"
).innerHTML = "";

document.getElementById(
"materialContainer"
).innerHTML = "";

document.getElementById(
"chargeContainer"
).innerHTML = "";


addMaterialRow(
"panelContainer",
"Solar Panel"
);

addMaterialRow(
"inverterContainer",
"Inverter"
);

addMaterialRow(
"materialContainer",
"Material"
);

addMaterialRow(
"chargeContainer",
"Charge"
);

}


loadPrices();

