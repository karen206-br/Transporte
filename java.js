const tarjetasRegistradas = {
      "0011442801": { estado: "Activa", saldo: 1.25 },
      "0011442802": { estado: "Inactiva", saldo: 0.00 },
      "55555555": { estado: "Activa", saldo: 0.45 }
    };
window.addEventListener('DOMContentLoaded', () => {
    const resultado = document.getElementById('resultadoTarjeta');
    function onScanSuccess(decodedText, decodedResult) {
      if (tarjetasRegistradas[decodedText]) {
        const info = consutarTarjeta[decodedText];
        resultado.innerHTML = `
          <p><strong>Tarjeta:</strong> ${decodedText}</p>
          <p><strong>Estado:</strong> ${info.estado}</p>
          <p><strong>Saldo disponible:</strong> $${info.saldo.toFixed(2)}</p>
        `;
      } else {
        resultado.innerHTML = `<p style="color:red;">Tarjeta no registrada.</p>`;
      }
      html5QrcodeScanner.clear();
    }
    function onScanFailure(error) {
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });
let map = L.map('mapa').setView([-2.9, -79.0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
let polyline; 
  function consultarTarjeta() {
    const numero = document.getElementById("cardNumber").value.trim();
    const resultado = document.getElementById("resultadoTarjeta");
    if (!numero) {
      resultado.innerHTML = "<p style='color: red;'>Por favor ingresa un número de tarjeta.</p>";
      return;
    }
    const tarjeta = tarjetas[numero];
    if (tarjeta) {
      if (tarjeta.saldo > 0) {
        resultado.innerHTML = `<p style="color: green;">✅ La tarjeta tiene saldo: $${tarjeta.saldo.toFixed(2)}</p>`;
      } else {
        resultado.innerHTML = `<p style="color: orange;">⚠️ La tarjeta no tiene saldo.</p>`;
      }
    } else {
      resultado.innerHTML = "<p style='color: red;'>❌ Tarjeta no encontrada.</p>";
    }
  }
