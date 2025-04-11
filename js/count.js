
function mostrarVisitas(data) {
	document.getElementById('count').textContent = data.visitas;
}

  const script = document.createElement('script');
  script.src = 'https://script.google.com/macros/s/AKfycbwZrlB6VelnVc_lWh9Kmn56UiiT_qHL7Dji2xGOu9GnvMqsycKpbNYeuVcg82m0b9HT6A/exec?callback=mostrarVisitas';
  document.body.appendChild(script);