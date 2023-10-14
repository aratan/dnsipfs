// version 0.01
async function obtenerDNSLink() {
      try {
        const response = await fetch('https://dns.google/resolve?name=dataarchitectai.link&type=TXT');
        const data = await response.json();
        mostrarDNSLink(data);
      } catch (error) {
        console.error('Error al obtener los resultados:', error);
      }
    }

    // Función para mostrar solo el resultado de DNSLink en el iframe
    function mostrarDNSLink(data) {
      const iframeResultado = document.getElementById('iframeResultado');

      // Verifica si la respuesta tiene datos
      if (data && data.Answer && data.Answer.length > 0) {
        // Busca el valor de dnslink en los resultados
        const dnslinkResult = data.Answer.find(result => result.data.includes("dnslink"));

        if (dnslinkResult) {
          // Extrae el valor de dnslink y construye la URL con Cloudflare para IPNS/IPFS
          const dnslinkValue = dnslinkResult.data.match(/dnslink=(.*)/)[1];
          //https://cloudflare-ipfs.com/ipns/dataarchitectai.link/
          const urlConCloudflare = `https://cloudflare-ipfs.com/${dnslinkValue}`;
          alert(urlConCloudflare)
          // Establece la URL en el iframe
          iframeResultado.src = urlConCloudflare;
        } else {
          // Si no se encuentra dnslink, muestra un mensaje
          iframeResultado.textContent = 'No se encontró el valor de DNSLink.';
        }
      } else {
        // Si no hay resultados, muestra un mensaje
        iframeResultado.textContent = 'No se encontraron resultados.';
      }
    }

    // Llama a la función al cargar la página
    window.onload = obtenerDNSLink;
