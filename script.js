const dropList = document.querySelectorAll(".drop_list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");
for (var i = 0; i < dropList.length ;i++) {
	for(currency_code in country_code){
		let selected;
		if(i == 0){
			selected = currency_code == "USD" ? "selected" : "";
		}else if(i == 1){
			selected = currency_code == "PKR" ? "selected" : "";
		}
		let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
		dropList[i].insertAdjacentHTML("beforeEnd",optionTag);
	}
	dropList[i].addEventListener("change", e =>{
		loadFlag(e.target);
	});
}
// function loadFlag(element){
// 	for(code in country_code){
// 		if (code == element.value) {
// 			let imgTag = element.parentElement.querySelector("img");
// 			imgTag.src = `https://www.countryflags.com/${country_code[code]}/flat/64.png`
// 		}
// 	}
// }
window.addEventListener("load", () =>{
	getExchangeRate();
});
getButton.addEventListener("click", e =>{
	e.preventDefault();
	getExchangeRate();
});
const exchangeIcon = document.querySelector(".drop_list .icon");
exchangeIcon.addEventListener("click", ()=>{
	let tempCode = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
	toCurrency.value = tempCode;
	loadFlag(fromCurrency);
	loadFlag(toCurrency);
	getExchangeRate();
})
function getExchangeRate(){
	const amount = document.querySelector(".amount input");
	exchangeRateTxt = document.querySelector(".exchange_rate");
	let amountVal = amount.value;
	if (amountVal == "" || amountVal == "0"){
		amount.value = "1";
		amountVal = 1;
	}
	exchangeRateTxt.innerText = "Getting Exchange Rate....";
	let url = `https://v6.exchangerate-api.com/v6/69437a0899e0708681add09b/latest/${fromCurrency.value}`;
	fetch(url).then(response => response.json()).then(result =>{
		let exchangeRate = result.conversion_rates[toCurrency.value];
		let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
		exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
	})
}