document.addEventListener("DOMContentLoaded", function () {
  // 1. Cargar el header dinámicamente
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
      })
      .catch((error) => console.error("Error al cargar el header:", error));
  }

  // 2. Control de animaciones al hacer scroll para TODAS las tarjetas y elementos con la clase
  setTimeout(() => {
    const elementosAnimados = document.querySelectorAll(".card-animada-scroll");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("en-vista");
            observerInstance.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
      });
    } else {
      elementosAnimados.forEach(elemento => {
        elemento.classList.add("en-vista");
      });
    }
  }, 100);

  // 3. Interactividad para la sección de Toldos
  const toldosData = [
      {
          title: "Toldo Retráctil",
          desc: "Sistema extensible sin columnas fijas para mantener la vista libre y regular la entrada de sol a tu medida.",
          img: "/ertoldospersianas/imagenes/toldo retractil.jpg"
      },
      {
          title: "Toldo Vertical",
          desc: "Ideal para balcones y terrazas. Protege del viento, la lluvia lateral y los rayos UV sin perder visibilidad hacia el exterior.",
          img: "/ertoldospersianas/imagenes/toldo vertical.jpg"
      },
      {
          title: "Persiana Exterior",
          desc: "Máximo control térmico y de privacidad para ventanas y ventanales. Ayuda a mantener fresco el interior de tu hogar.",
          img: "/ertoldospersianas/imagenes/persiana exterior.jpg"
      },
      {
          title: "Toldo Comercial",
          desc: "Toldo fijo para fachadas de cafés, restaurantes y locales: resguarda la entrada, da sombra a tu terraza y refuerza tu imagen.",
          img: "/ertoldospersianas/imagenes/toldo comercial.png"
      }
  ];

  const buttons = document.querySelectorAll('.toldo-tab-btn');
  const titleEl = document.getElementById('toldoTitle');
  const descEl = document.getElementById('toldoDesc');
  const imgEl = document.getElementById('toldoImg');
  const displayContainer = document.getElementById('toldoDisplay');

  if (buttons.length > 0 && titleEl) {
      buttons.forEach(button => {
          button.addEventListener('click', () => {
              buttons.forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');

              const index = button.getAttribute('data-index');
              const data = toldosData[index];

              displayContainer.style.opacity = '0';

              setTimeout(() => {
                  titleEl.textContent = data.title;
                  descEl.textContent = data.desc;
                  imgEl.src = data.img;
                  imgEl.alt = data.title;

                  displayContainer.style.opacity = '1';
              }, 200);
          });
      });
  }

  // 4. Formulario de contacto -> WhatsApp (cambia el número, con código de país y sin +)
  const WA_NUMERO = "584220963926";
  const form = document.getElementById("formContacto");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const msg = `Hola, soy ${d.get("nombre")}. Me interesa: ${d.get("producto")}. ${d.get("mensaje") || ""}`.trim();
      window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  }
});
