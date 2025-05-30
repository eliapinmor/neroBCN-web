function mostrarHabitaciones() {
    const container = document.getElementById("roomContainer");
    const url = "http://172.17.40.7:8080/room/listRooms";
    // const url = "http://127.0.0.1:8080/room/listRooms";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(habitaciones => {
            // Mostrar solo 3 habitaciones
            const habitacionesMostrar = habitaciones.slice(0, 5);
            
            habitacionesMostrar.forEach(room => {
                container.innerHTML += `
                    <div class="room-card">
                        <img src="${room.photoUrl}" alt="${room.name}" class="room-img">
                        <div class="room-info">
                            <h3>${room.name}</h3>
                            <p>${room.description || "Disfruta de una estancia cómoda y elegante con todas las comodidades."}</p>
                            <a href="html/rooms.html" class="btn-room-details">Ver habitación</a>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error.message);
            container.innerHTML = `
                <div class="error-message">
                    <p>No se pudieron cargar las habitaciones en este momento.</p>
                    <a href="html/rooms.html" class="btn-room-details">Ver habitaciones</a>
                </div>
            `;
        });
}

document.addEventListener('DOMContentLoaded', mostrarHabitaciones);











document.addEventListener('DOMContentLoaded', function() {
  const headerContainer = document.getElementById('headerContainer');
  const heroSection = document.querySelector('.hero');
  
  // Calcular altura del hero solo si existe
  const heroHeight = heroSection ? heroSection.offsetHeight : 0;
  
  function handleScroll() {
    if (window.scrollY > heroHeight) {
      headerContainer.classList.add('fixed');
    } else {
      headerContainer.classList.remove('fixed');
    }
  }
  
  // Ejecutar al cargar por si la página no está en top
  handleScroll();
  
  // Escuchar eventos de scroll con debounce para mejor rendimiento
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, false);
  
  // Opcional: Smooth scroll para los enlaces
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajuste para el header fijo
          behavior: 'smooth'
        });
      }
    });
  });
});




