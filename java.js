window.addEventListener('DOMContentLoaded', () => {
    // Simulación de tarjetas registradas
    const tarjetasRegistradas = {
      "12345678": { estado: "Activa", saldo: 1.25 },
      "98765432": { estado: "Inactiva", saldo: 0.00 },
      "55555555": { estado: "Activa", saldo: 0.45 }
    };
  
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
  
      // Detener escaneo después de un resultado exitoso
      html5QrcodeScanner.clear();
    }
  
    function onScanFailure(error) {
      // Puedes dejarlo vacío o imprimir si estás debuggeando
      // console.warn(`QR Scan falló: ${error}`);
    }
  
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250
      },
      false // verbose
    );
  
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });
// Inicializar mapa con Leaflet
let map = L.map('mapa').setView([-2.9, -79.0], 13); // Cuenca centro
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let polyline; // Para poder eliminarla al cambiar línea


const tarjetas = {
    "12345678": { saldo: 12.5 },
    "87654321": { saldo: 0 },
    "11112222": { saldo: 3.75 },
  };

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