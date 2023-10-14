// Version 0.02
    async function obtenerDNSLink() {
      try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=TXT`);
        const data = await response.json();
        mostrarDNSLink(data);
      } catch (error) {
        console.error('Error al obtener los resultados:', error);
      }
    }

    // Llama a la función al cargar la página
    window.onload = obtenerDNSLink;
