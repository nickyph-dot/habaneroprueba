// Animaciones o lógica futura
console.log("Habanero Marketing Studio listo para encender 🔥");

// Ejemplo de conexión futura a Supabase (comentado)
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://TU-PROYECTO.supabase.co', 'TU_API_KEY')

async function cargarTestimonios() {
  let { data: testimonios, error } = await supabase
    .from('testimonios')
    .select('*')
  
  if (error) console.error(error)
  else console.log(testimonios)
}
*/

// Ocultar loader cuando la página haya cargado
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});


