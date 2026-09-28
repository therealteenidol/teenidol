window.onload = function () {
  // Ofuscación del número de teléfono
  const phone = "652" + "681" + "155";
  document.getElementById("phone").innerHTML =
    "Teléfono: <a href='tel:" + phone + "' class='green'>" + phone + "</a>";

  const skills = [
    "Inicializanbdo habilidades técnicas",
    "Cargando experiencia",
    "Arrancando más de 10 años en php",
    "Conectando con bases de datos desde 2007",
    "Lanzando librerias de JavaScript",
    "Renderizando estrucutra HTML",
    "Aplicando estilos CSS",
    "Posibilidada de compilar a SWIFT",
    "Cargando videojuegos con UNITY",
    "Activando páginas web en Wordpress",
    "Integrando tiendas virtuales con WooCommerce",
    "Desarrollo de apps completas",
    "Diseñando prompts para la IA",
    "Carga completada. Developer fully operational",
  ];

  const bootLog = document.getElementById("boot-log");
  const loadingBar = document.getElementById("loading-bar");

  const tiempoInicio = Date.now();

  let skillIndex = 0;
  let velocidad = 50; // Velocidad de carga en milisegundos

  const maxSkillLength = Math.max(...skills.map((skill) => skill.length));
  const totalLineLength = maxSkillLength + 20; // 20 puntos como máximo visual
  let dialogues = [];
  function updateLoadingBar(progress) {
    const filled = Math.round((progress / skills.length) * totalLineLength);
    const bar =
      "[" + ".".repeat(filled) + " ".repeat(totalLineLength - filled) + "]";
    loadingBar.textContent = bar;
    const percent = Math.round((progress / skills.length) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
  }

  function loadSkillWithDots(skill, callback) {
    let dots = 0;
    const maxDots = totalLineLength - skill.length;
    const interval = setInterval(() => {
      const line = skill + ".".repeat(dots);
      const lines = bootLog.innerHTML.split("\n");
      lines[lines.length - 1] = line;
      bootLog.innerHTML = lines.join("\n");
      dots++;
      if (dots > maxDots) {
        clearInterval(interval);
        const completeLine =
          skill +
          ".".repeat(maxDots) +
          " <span class='yellow'>COMPLETADO</span>";
        const lines = bootLog.innerHTML.split("\n");
        lines[lines.length - 1] = completeLine;
        bootLog.innerHTML = lines.join("\n");
        callback();
      }
    }, velocidad);
  }

  function loadNextSkill() {
    if (skillIndex < skills.length) {
      bootLog.innerHTML += "\n";
      loadSkillWithDots(skills[skillIndex], () => {
        updateLoadingBar(skillIndex + 1);
        skillIndex++;
        setTimeout(loadNextSkill, 300);
      });
    } else {
      // Ocultar pantalla de carga y mostrar visual novel
      document.getElementById("visual-loading").style.display = "none";
      document.querySelector(".visual-novel").style.display = "block";
      document.getElementById("skip-interview-container").style.display = "block";
      document.getElementById("hola").classList.add("blink");

      dialogues = [
        {
          speaker: "Entrevistador",
          text:
            "Hola Jose Ángel, perdona por haberte hecho esperar tiempoTotal segundos para tu entrevista nº " +
            visitCount +
            ". ¿Cómo tal?",
        },
        {
          speaker: "Jose Ángel",
          text: "Muy bien, gracias. Con muchas ganas de esta entrevista.",
        },
        {
          speaker: "Entrevistador",
          text:
            "Nos alegra. " +
            (document.getElementById("hacker-button").innerText == "BOOST RAM"
              ? "Queremos conocerte más allá del código. ¿Cómo describirías tu forma de trabajar en equipo?"
              : "Como has instalado más RAM, empezamos directamente. ¿Podrías contarnos un poco sobre ti y tu experiencia?"),
        },
        {
          speaker: "Jose Ángel",
          text: "Me considero una persona colaborativa. Me gusta escuchar, aportar ideas y adaptarme al estilo de trabajo del equipo.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Cómo manejas los desacuerdos o conflictos en un proyecto?",
        },
        {
          speaker: "Jose Ángel",
          text: "Intento entender el punto de vista del otro, buscar soluciones objetivas y mantener siempre una comunicación respetuosa.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Qué valoras más en un entorno de trabajo?",
        },
        {
          speaker: "Jose Ángel",
          text: "La confianza, la claridad en los objetivos y un ambiente donde se pueda aprender y crecer sin miedo a equivocarse.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Cómo gestionas el estrés o los plazos ajustados?",
        },
        {
          speaker: "Jose Ángel",
          text: "Organizo tareas por prioridad, mantengo la calma y si es necesario, pido ayuda o renegocio tiempos con transparencia.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Qué haces cuando te enfrentas a un problema técnico que no sabes resolver?",
        },
        {
          speaker: "Jose Ángel",
          text: "Investigo, pruebo soluciones, consulto documentación y si hace falta, pido consejo a compañeros. Me gusta aprender de cada reto.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Qué te motiva como desarrollador?",
        },
        {
          speaker: "Jose Ángel",
          text: "Ver cómo una idea se convierte en una solución útil. Y saber que lo que hago tiene impacto real en usuarios o empresas.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Tienes alguna experiencia donde tu actitud haya marcado la diferencia?",
        },
        {
          speaker: "Jose Ángel",
          text: "Sí, en un proyecto con mucho retraso, propuse reorganizar tareas y mejorar la comunicación. Logramos entregarlo a tiempo y con buena calidad.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Qué esperas de nosotros como empresa?",
        },
        {
          speaker: "Jose Ángel",
          text: "Un entorno donde pueda seguir creciendo, aportar valor y sentirme parte de un equipo con visión y propósito.",
        },
        {
          speaker: "Entrevistador",
          text: "Gracias Jose Ángel. Tendrías algo que poder enseñarnos? algun proyecto del que estés especialmente orgulloso?",
        },
        {
          speaker: "Jose Ángel",
          text: "Sí, tengo varios proyectos que me gustaría mostrar. Uno de ellos es un juego interactivo que desarrollé en JavaScript y Canvas 2D, llamado Lupis Walk. ",
        },
         {
          speaker: "Jose Ángel",
          text: "También he trabajado en un juego RPG de ritmo llamado Beat Fantasy, desarrollado en Unity.",
        },
         {
          speaker: "Jose Ángel",
          text: "Continua para ver los proyectos.",
        },
      ];

      //document.getElementById("hacker-button").style.display = "none";
    }
  }

  let currentIndex = -1;

  let avatar = document.querySelector(".avatar");
  let cajaDialogo = document.getElementById("caja-dialogo");
  let speaker = document.getElementById("speaker");
  let dialogue = document.getElementById("dialogue");
  let visualNovel = document.querySelector(".visual-novel");
  let hackerButton = document.getElementById("hacker-button");

  function nextDialogue() {
    visualNovel.style.backgroundImage = "url('./imagenes/oficina1.jpeg')";
    if (currentIndex === -1) {
      avatar.style.display = "block";
      cajaDialogo.style.display = "block";
    }

    const tiempoActual = Date.now();

    currentIndex++;
    if (currentIndex < dialogues.length) {
      if (currentIndex === 0) {
        dialogues[currentIndex].text = dialogues[currentIndex].text.replace(
          "tiempoTotal",
          (tiempoTranscurrido = (tiempoActual - tiempoInicio) / 1000)
        );
      }

      if (dialogues[currentIndex].speaker === "Jose Ángel") {
        avatar.style.backgroundImage = "url('./imagenes/avatar.png')";
        avatar.style.float = "left";
      } else {
        avatar.style.backgroundImage = "url('./imagenes/entrevistador.png')";
        avatar.style.float = "right";
      }
      speaker.innerText = dialogues[currentIndex].speaker;
      dialogue.innerText = dialogues[currentIndex].text;
      
      // Mostrar juegos cuando llegue al último diálogo
      if (currentIndex === dialogues.length - 1) {
        document.getElementById("games-arcade").style.display = "block";
        document.getElementById("skip-interview-container").style.display = "none";
      }
    }
  }

  visualNovel.addEventListener("click", nextDialogue);

  // Función para avanzar rápidamente al final de la entrevista
  let skipInterviewButton = document.getElementById("skip-interview-button");
  let fastForwarding = false;

  function fastForwardInterview() {
    if (fastForwarding || currentIndex >= dialogues.length - 1) return;
    
    fastForwarding = true;
    document.getElementById("skip-interview-container").style.display = "none";
    
    // Agregar efecto VHS
    visualNovel.classList.add("vhs-rewind");
    
    let fastForwardInterval = setInterval(() => {
      currentIndex++;
      
      if (currentIndex >= dialogues.length) {
        clearInterval(fastForwardInterval);
        fastForwarding = false;
        currentIndex = dialogues.length - 1;
        visualNovel.classList.remove("vhs-rewind");
        document.getElementById("games-arcade").style.display = "block";
        return;
      }
      
      if (dialogues[currentIndex].speaker === "Jose Ángel") {
        avatar.style.backgroundImage = "url('./imagenes/avatar.png')";
        avatar.style.float = "left";
      } else {
        avatar.style.backgroundImage = "url('./imagenes/entrevistador.png')";
        avatar.style.float = "right";
      }
      
      speaker.innerText = dialogues[currentIndex].speaker;
      dialogue.innerText = dialogues[currentIndex].text;
      
      if (currentIndex === dialogues.length - 1) {
        clearInterval(fastForwardInterval);
        fastForwarding = false;
        visualNovel.classList.remove("vhs-rewind");
        document.getElementById("games-arcade").style.display = "block";
      }
    }, 150); // Cambiar diálogos cada 150ms (efecto rebobinado rápido)
  }

  skipInterviewButton.addEventListener("click", fastForwardInterview);

  hackerButton.addEventListener("click", function () {
    if (hackerButton.innerText === "BOOST RAM") {
      velocidad = 10; // Aumentar la velocidad de carga
      hackerButton.innerText = "SKIP LOADING";
      document.getElementById("progress-bar").style.backgroundColor = "#1b37e3";
    } else if (hackerButton.innerText === "SKIP LOADING") {
      // Completar todas las habilidades visualmente
      bootLog.innerHTML = "";
      skills.forEach((skill, index) => {
        const maxDots = totalLineLength - skill.length;
        const completeLine =
          skill +
          ".".repeat(maxDots) +
          " <span class='yellow'>COMPLETADO</span>";
        bootLog.innerHTML += (index > 0 ? "\n" : "") + completeLine;
      });
      
      // Completar la barra de progreso
      updateLoadingBar(skills.length);
      
      // Saltar directamente al final
      skillIndex = skills.length;
      
      // Esperar un momento para que se vea la carga completa
      setTimeout(() => {
        document.getElementById("visual-loading").style.display = "none";
        document.querySelector(".visual-novel").style.display = "block";
        document.getElementById("skip-interview-container").style.display = "block";
        document.getElementById("hola").classList.add("blink");
      
      // Preparar los diálogos
      dialogues = [
        {
          speaker: "Entrevistador",
          text:
            "Hola Jose Ángel, perdona por haberte hecho esperar tiempoTotal segundos para tu entrevista nº " +
            visitCount +
            ". ¿Cómo tal?",
        },
        {
          speaker: "Jose Ángel",
          text: "Muy bien, gracias. Con muchas ganas de esta entrevista.",
        },
        {
          speaker: "Entrevistador",
          text: "Como has saltado la carga, empezamos directamente. ¿Podrías contarnos un poco sobre ti y tu experiencia?",
        },
        {
          speaker: "Jose Ángel",
          text: "Me considero una persona colaborativa. Me gusta escuchar, aportar ideas y adaptarme al estilo de trabajo del equipo.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Cómo manejas los desacuerdos o conflictos en un proyecto?",
        },
        {
          speaker: "Jose Ángel",
          text: "Intento entender el punto de vista del otro, buscar soluciones objetivas y mantener siempre una comunicación respetuosa.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Qué valoras más en un entorno de trabajo?",
        },
        {
          speaker: "Jose Ángel",
          text: "La confianza, la claridad en los objetivos y un ambiente donde se pueda aprender y crecer sin miedo a equivocarse.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Cómo gestionas el estrés o los plazos ajustados?",
        },
        {
          speaker: "Jose Ángel",
          text: "Organizo tareas por prioridad, mantengo la calma y si es necesario, pido ayuda o renegocio tiempos con transparencia.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Cómo te mantienes actualizado con las nuevas tecnologías?",
        },
        {
          speaker: "Jose Ángel",
          text: "Leo documentación, hago cursos, experimento con proyectos personales y participo en comunidades de desarrollo.",
        },
        {
          speaker: "Entrevistador",
          text: "¿Tienes alguna pregunta para nosotros?",
        },
        {
          speaker: "Jose Ángel",
          text: "Sí, me gustaría saber más sobre los proyectos en los que trabajaría y la cultura del equipo.",
        },
        {
          speaker: "Entrevistador",
          text: "Perfecto, Jose Ángel. Hemos terminado. Nos pondremos en contacto contigo pronto. Muchas gracias por tu tiempo.",
        },
        {
          speaker: "Jose Ángel",
          text: "Gracias a vosotros. ¡Hasta pronto!",
        },
      ];
      
      nextDialogue();
      }, 800); // Esperar 800ms para que se vea la carga completa
    }
  });

  loadNextSkill();
};

let visitCount;
// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Función para establecer una cookie
// name: nombre de la cookie
// value: valor de la cookie
// days: número de días que la cookie será válida (ej: 365 para un año)
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// --- Lógica principal para contar visitas ---
document.addEventListener("DOMContentLoaded", (event) => {
  visitCount = parseInt(getCookie("visitCount") || "0"); // Leer el contador actual, si no existe, es 0
  visitCount++; // Incrementar el contador

  setCookie("visitCount", visitCount, 365); // Guardar el nuevo contador por un año

  console.log(`Esta es tu visita número: ${visitCount}`);
});
