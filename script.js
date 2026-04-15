const cvData = [
    { title: "NICOLÁS FELIPE", text: "Técnico Informático | Estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM)" },
    { title: "SOBRE MÍ", text: "Técnico informático especializado en el despliegue de sistemas y el desarrollo de software multiplataforma. Enfocado en la optimización de procesos mediante código limpio y la resolución eficiente de incidencias técnicas en entornos de red." },
    { title: "EDUCACIÓN", isList: true, items: [
        "• 2025 Estudios actuales: CFGS Desarrollo de Aplicaciones Multiplataforma en Centre d'estudis Politècnics [12/09/2025 - Actualidad].",
        "• 2025 Grado Medio: Ciclo Formativo Grado Medio Sistemas Microinformáticos y Redes en Escola del Treball Barcelona [12/09/2023 - 06/06/2025]. Prácticas FCT: Soporte técnico, montaje de equipos y mantenimiento de infraestructuras de red.",
        "• 2023 ESO: Escola Mireia [12/09/2019 - 22/06/2023]."
    ]},
    { title: "HABILIDADES TÉCNICAS", isList: true, items: [
        "• Sistemas y Redes: Configuración de redes locales y administración de Windows y Linux.",
        "• Datos y Gestión: Diseño de bases de datos SQL y administración de suites ofimáticas.",
        "• Desarrollo Software: Dominio de Java y Python aplicado a lógica de negocio y POO.",
        "• Desarrollo Web: Interfaces dinámicas con HTML5, CSS3 y JavaScript (JS)."
    ]},
    { title: "CONTACTO E IDIOMAS", text: "📍 Barcelona (España) | 📞 (+34) 639 16 155 77\n📧 nfelipevaquero@gmail.com | 🌐 Nacionalidad: Española\n🗣 Idiomas: Español, Catalán e Inglés (B2).\n🔗 LinkedIn | Portfolio" }
];

const techWords = ["Java", "Python", "HTML5", "CSS3", "JavaScript", "JS", "SQL", "Windows", "Linux", "DAM", "CFGS", "FCT", "POO", "Bash", "Git"];
const container = document.getElementById('cv-content');
const scrollContainer = document.getElementById('scroll-container');
let secIdx = 0, charIdx = 0, itemIdx = 0;

function type() {
    if (secIdx < cvData.length) {
        let section = cvData[secIdx];
        if (charIdx === 0 && itemIdx === 0) {
            let div = document.createElement('div');
            div.className = "section-block";
            div.innerHTML = `<h2>${section.title}</h2><div id="sec-${secIdx}"></div>`;
            container.appendChild(div);
        }
        let target = document.getElementById(`sec-${secIdx}`);
        
        if (section.isList) {
            if (itemIdx < section.items.length) {
                if (charIdx === 0) target.innerHTML += `<p id="item-${secIdx}-${itemIdx}"></p>`;
                write(document.getElementById(`item-${secIdx}-${itemIdx}`), section.items[itemIdx], true);
            } else { next(); }
        } else {
            write(target, section.text, false);
        }
    }
}

function write(el, fullText, isListItem) {
    let chunkSize = 6; 
    let chunk = fullText.substring(charIdx, charIdx + chunkSize);
    el.innerHTML += chunk;
    charIdx += chunkSize;

    if (scrollContainer.scrollHeight - scrollContainer.scrollTop > scrollContainer.clientHeight) {
        scrollContainer.scrollBy({ top: 3, behavior: 'auto' });
    }

    if (charIdx < fullText.length) {
        setTimeout(type, 15);
    } else {
        let finalContent = el.innerHTML;
        techWords.forEach(w => {
            const r = new RegExp(`\\b${w}\\b`, 'g');
            finalContent = finalContent.replace(r, `<span class="tech-badge">${w}</span>`);
        });
        el.innerHTML = finalContent;
        if (isListItem) { itemIdx++; charIdx = 0; setTimeout(type, 100); }
        else { next(); }
    }
}

function next() { secIdx++; charIdx = 0; itemIdx = 0; setTimeout(type, 300); }

function printCV() {
    let printHTML = "";
    cvData.forEach(s => {
        let h = `<h2>${s.title}</h2>`;
        if (s.isList) s.items.forEach(it => {
            let itemText = it;
            techWords.forEach(w => itemText = itemText.replace(new RegExp(`\\b${w}\\b`, 'g'), `<span style="font-weight:bold; color:#000080;">${w}</span>`));
            h += `<p>${itemText}</p>`;
        });
        else {
            let bodyText = s.text.replace(/\n/g, '<br>');
            techWords.forEach(w => bodyText = bodyText.replace(new RegExp(`\\b${w}\\b`, 'g'), `<span style="font-weight:bold; color:#000080;">${w}</span>`));
            h += `<p>${bodyText}</p>`;
        }
        printHTML += `<div style="margin-bottom:20px;">${h}</div>`;
    });

    const win = window.open('', '_blank');
    const imgElement = document.querySelector('.slow-load-img');
    const imgSrc = imgElement ? imgElement.src : '';
    
    win.document.write(`
        <html>
        <head><title>Nicolás Felipe - CV</title><style>
            body { font-family: 'Times New Roman', serif; padding: 40px; }
            .p-img { float: left; width: 150px; height: 150px; margin-right: 20px; border: 1px solid #000; object-fit: cover; }
            h2 { border-bottom: 2px solid black; text-transform: uppercase; font-size: 18px; margin-top: 0; }
            p { font-size: 16px; margin: 5px 0; line-height: 1.4; }
            .content { clear: none; }
        </style></head>
        <body>
            ${imgSrc ? `<img src="${imgSrc}" class="p-img">` : ''}
            <div class="content">${printHTML}</div>
        </body>
        </html>
    `);
    win.document.close();
    win.onload = function() { win.print(); win.close(); };
    setTimeout(() => { if(!win.closed) win.print(); }, 500);
}

window.onload = () => { setTimeout(type, 800); };