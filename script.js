import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const portafolioService = new PortafolioService();
const formulario = document.getElementById('formProyecto');
formulario.addEventListener('submit', createProyecto);

const contenedorProyectos = document.querySelector(".projects__container");


function createProyecto(event)

{
    event.preventDefault();

  const nombre = formulario["name"].value.trim();
  const descripcion = formulario["description"].value.trim();
  const tecnologias = formulario["tecnologies"].value.split("\n").map(t => t.trim()).filter(t => t !== "");
  const colaboradores = formulario["contributors"].value.split("\n").map(c => c.trim()).filter(c => c !== "");
  const repositorio = formulario["repository"].value.trim();

  const nuevoProyecto = new Proyecto(nombre, tecnologias, descripcion, colaboradores, repositorio);

  portafolioService.guardarProyecto(nuevoProyecto);

  dibujarProyecto(nuevoProyecto);

  formulario.reset();
}

function dibujarProyecto(proyecto) {
  const divProyecto = document.createElement("div");
  divProyecto.classList.add("project");
  divProyecto.id = `${proyecto.id}-project`;

  const listaTecnologias = proyecto.tecnologias.map(t => `<li>${t}</li>`).join("");
  const listaColaboradores = proyecto.coolaboradores.map(c => `<li>${c}</li>`).join("");

  divProyecto.innerHTML = `<h3>${proyecto.nombre}</h3> <p>${proyecto.descripcion}</p> <p><strong>Tecnologias</strong></p>
      <div class="projects__section">
          <ul>${listaTecnologias}</ul>
      </div>
      <p><strong>Colaboradores</strong></p>
      <div class="projects__section">
          <ul>${listaColaboradores}</ul>
      </div>
      <div>Puedes encontrar el repositorio en <a href="${proyecto.repositorio}" target="_blank">${proyecto.repositorio}</a></div>`;

  contenedorProyectos.appendChild(divProyecto);
}