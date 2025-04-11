
function mostrarVisitas(data) {
	const countEl = document.getElementById('count');
	if (data && data.visitas !== undefined) {
		console.log(data);
		countEl.textContent = data.visitas;
	} else {
		countEl.textContent = 'Error 😢';
	}
}

(function () {
	const script = document.createElement('script');
	script.src = 'https://script.google.com/macros/s/AKfycbw5pQ0lGmZvVZs9mm99ezzDZUKCXE6pJD4xgfS4TNj1mxiL15RlqHNUtObLdNxwBIoUdA/exec?callback=mostrarVisitas';
	document.body.appendChild(script);
})();
  