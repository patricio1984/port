const countEl = document.getElementById('count');

updateVisitCount();

function updateVisitCount() {
  fetch('https://script.google.com/macros/s/AKfycbzTbO6D1AdQyUpNtkJyJce6L9En91cxStzb2QMm9Yt6fD2YVYhO6qP26bJ9uGty1rlQ/exec')
    .then(res => res.json())
    .then(res => {
      countEl.innerHTML = res.visitas;
    })
    .catch(err => {
      console.error('Error al contar visitas:', err);
      countEl.innerHTML = 'Error 😢';
    });
}