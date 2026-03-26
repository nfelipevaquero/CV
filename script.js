const cvData = [
    "NICOLÁS FELIPE\nTécnico Informático | Estudiante de DAM",
    "\nSOBRE MÍ\n[cite: 12] Técnico informático especializado en el despliegue de sistemas y el desarrollo de software multiplataforma. [cite: 13] Enfocado en la optimización de procesos mediante código limpio y la resolución eficiente de incidencias técnicas en entornos de red. [cite: 14]",
    "\nEDUCACIÓN\n- 2025 Actualidad: CFGS Desarrollo de Aplicaciones Multiplataforma en Centre d'estudis Politècnics. [cite: 16, 17, 18]\n- 2025 Grado Medio: Sistemas Microinformáticos y Redes en Escola del Treball Barcelona. [cite: 19, 20, 22]\n- Prácticas FCT: Soporte técnico, montaje de equipos y mantenimiento de red. [cite: 21]\n- 2023 ESO: Escola Mireia. [cite: 23, 24, 25]",
    "\nHABILIDADES TÉCNICAS\n- Sistemas y Redes: Configuración de redes locales y administración Windows/Linux. [cite: 31]\n- Datos y Gestión: Diseño de bases de datos SQL y suites ofimáticas. [cite: 32]\n- Desarrollo Software: Dominio de Java y Python (POO). [cite: 33]\n- Desarrollo Web: Interfaces dinámicas con HTML5, CSS3 y JavaScript. [cite: 34]",
    "\nCONTACTO e IDIOMAS\n- Teléfono: (+34) 639 16 155 77 [cite: 2]\n- Email: nfelipevaquero@gmail.com [cite: 3]\n- Idiomas: Español, Catalán e Inglés (B2). [cite: 6, 7, 26]",
    "\n----------------------------------------------------------\nDOCUMENTO FINALIZADO."
];

const container = document.getElementById('cv-content');
const scrollContainer = document.getElementById('scroll-container');
let sectionIndex = 0;
let charIndex = 0;

// Función de scroll forzado
const forceScroll = setInterval(() => {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}, 10);

function typeWriter() {
    if (sectionIndex < cvData.length) {
        let currentText = cvData[sectionIndex];
        
        if (charIndex < currentText.length) {
            // Escribir caracteres de 4 en 4 para velocidad
            let chunk = currentText.substring(charIndex, charIndex + 4);
            
            // Si es el inicio de sección, creamos un div
            if (charIndex === 0) {
                let div = document.createElement('div');
                div.id = "sec-" + sectionIndex;
                container.appendChild(div);
            }
            
            document.getElementById("sec-" + sectionIndex).innerText += chunk;
            charIndex += 4;
            setTimeout(typeWriter, 5);
        } else {
            sectionIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 50);
        }
    } else {
        clearInterval(forceScroll); // Detener el scroll automático al terminar
    }
}

window.onload = typeWriter;