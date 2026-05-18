window.onload = function(){

const randomNo =
Math.floor(
1000 + Math.random() * 9000
);

document.getElementById(
"quotationNumberInput"
).value =
"QT-" + randomNo;


const today =
new Date()
.toISOString()
.split("T")[0];

document.getElementById(
"quotationDateInput"
).value =
today;


setTimeout(()=>{

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

},500);

}


let rowIndex = 0;


function addMaterialRow(
containerId,
categoryType
){

const container =
document.getElementById(
containerId
);


const row =
document.createElement(
"div"
);

row.className =
"material-row";


const filteredProducts =
products.filter(item => {

if(
categoryType ===
"Solar Panel"
){

return item.Category
.toLowerCase()
.includes("solar panel");

}

if(
categoryType ===
"Inverter"
){

return item.Category
.toLowerCase()
.includes("inverter");

}

if(
categoryType ===
"Charge"
){

return (
item.Category
.toLowerCase()
.includes("approval")

||

item.Category
.toLowerCase()
.includes("installation")

||

item.Category
.toLowerCase()
.includes("fabrication")

||

item.Category
.toLowerCase()
.includes("transport")
);

}


return !(
item.Category
.toLowerCase()
.includes("solar panel")

||

item.Category
.toLowerCase()
.includes("inverter")

||

item.Category
.toLowerCase()
.includes("approval")

||

item.Category
.toLowerCase()
.includes("installation")

||

item.Category
.toLowerCase()
.includes("fabrication")

||

item.Category
.toLowerCase()
.includes("transport")
);

});


const options =
filteredProducts.map(item=>{

return `
<option
value="${item.Price}"
data-name="${item["Item Name"]}"
data-brand="${item.Brand}"
data-unit="${item.Unit}"
>

${item.Brand}
•
${item["Item Name"]}
•
₹${item.Price}

</option>
`;

}).join("");


row.innerHTML = `

<select
class="materialSelect"
onchange="calculateBOQTotal()"
>

<option value="">
Select ${categoryType}
</option>

${options}

</select>

<input
type="number"
class="materialQty"
value="1"
oninput="calculateBOQTotal()"
>

<button
class="remove-btn"
onclick="removeRow(this)"
>
×
</button>

`;

container.appendChild(
row
);

rowIndex++;

}


function removeRow(button){

button.parentElement.remove();

calculateBOQTotal();

}


function calculateBOQTotal(){

const rows =
document.querySelectorAll(
".material-row"
);

let subtotal = 0;

rows.forEach(row=>{

const select =
row.querySelector(
".materialSelect"
);

const qty =
Number(
row.querySelector(
".materialQty"
).value || 0
);

const price =
Number(
select.value || 0
);

subtotal +=
price * qty;

});


const subsidy =
Number(
document.getElementById(
"subsidyInput"
).value || 0
);


const gst =
subtotal * 0.18;


const total =
subtotal + gst - subsidy;


document.getElementById(
"subtotalText"
).innerText =
"₹" +
subtotal.toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
);


document.getElementById(
"gstText"
).innerText =
"₹" +
gst.toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
);


document.getElementById(
"subsidyText"
).innerText =
"₹" +
subsidy.toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
);


document.getElementById(
"liveTotal"
).innerText =
"₹" +
total.toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
);

}


function collectItemsFrom(
containerId
){

const rows =
document.querySelectorAll(
`#${containerId} .material-row`
);

const items = [];

rows.forEach(row=>{

const select =
row.querySelector(
".materialSelect"
);

if(!select.value) return;

const option =
select.options[
select.selectedIndex
];

const qty =
Number(
row.querySelector(
".materialQty"
).value || 0
);

items.push({

name:
option.dataset.name,

brand:
option.dataset.brand,

unit:
option.dataset.unit,

qty,

rate:
Number(select.value),

total:
qty * Number(select.value)

});

});

return items;

}


function generateQuotation(){

const quotationData = {

quotationNo:
document.getElementById(
"quotationNumberInput"
).value,

date:
document.getElementById(
"quotationDateInput"
).value,

customerName:
document.getElementById(
"customerNameInput"
).value,

customerAddress:
document.getElementById(
"customerAddressInput"
).value,

boqItems:[

...collectItemsFrom(
"panelContainer"
),

...collectItemsFrom(
"inverterContainer"
),

...collectItemsFrom(
"materialContainer"
),

...collectItemsFrom(
"chargeContainer"
)

],

subtotal:
document.getElementById(
"subtotalText"
).innerText,

gst:
document.getElementById(
"gstText"
).innerText,

subsidy:
document.getElementById(
"subsidyText"
).innerText,

total:
document.getElementById(
"liveTotal"
).innerText

};


localStorage.setItem(
"quotationData",
JSON.stringify(
quotationData
)
);


window.location.href =
"quotation.html";

}
