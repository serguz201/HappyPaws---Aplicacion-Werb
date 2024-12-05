
/* FILTRO */
const filters = document.querySelectorAll('input[type="radio"]');
const dogCards = document.querySelectorAll('.dog-card');

filters.forEach(filter => {
    filter.addEventListener('change', filterDogs);
});

function filterDogs() {
    const selectedSpecies = document.querySelector('input[name="species"]:checked')?.value;
    const selectedWeight = document.querySelector('input[name="weight"]:checked')?.value;
    const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
    const selectedSex = document.querySelector('input[name="sex"]:checked')?.value;
    const selectedAge = document.querySelector('input[name="age"]:checked')?.value;

    dogCards.forEach(card => {
        const matchesSpecies = selectedSpecies ? card.dataset.species === selectedSpecies : true;
        const matchesWeight = selectedWeight ? card.dataset.weight === selectedWeight : true;
        const matchesSize = selectedSize ? card.dataset.size === selectedSize : true;
        const matchesSex = selectedSex ? card.dataset.sex === selectedSex : true;
        const matchesAge = selectedAge ? card.dataset.age === selectedAge : true;

        if (matchesSpecies && matchesWeight && matchesSize && matchesSex && matchesAge) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


/* BORRAR FILTRO*/

const clearButton = document.getElementById('clear-filters');

filters.forEach(filter => {
    filter.addEventListener('change', () => {
        const isAnyFilterChecked = Array.from(filters).some(filter => filter.checked);
        clearButton.style.display = isAnyFilterChecked ? 'block' : 'none';
    });
});

clearButton.addEventListener('click', () => {
    // Deseleccionar todos los inputs de radio
    filters.forEach(filter => {
        filter.checked = false;
    });

    // Mostrar todas las tarjetas de perros
    dogCards.forEach(card => {
        card.classList.remove('hidden');
    });

    // Ocultar el botón de "Borrar filtros" después de limpiar
    clearButton.style.display = 'none';
});

/* MAS INFORMCION TARJETAS */

document.querySelectorAll('.more-info').forEach(button => {
    button.addEventListener('click', function () {
        // Obtener el contenedor para el contenido adicional
        const readMoreCont = this.querySelector('.read-more-cont');
        
        // Obtener la caja de popup más cercana
        const popupBox = this.closest('.dog-card').querySelector('.popup-box');
        
        // Configurar el encabezado y el contenido del popup
        const popupHeader = popupBox.querySelector('h4');
        const popupBody = popupBox.querySelector('.popup-body');
        
        // Establecer el contenido del encabezado y cuerpo del popup
        popupHeader.textContent = readMoreCont.querySelector('h4').textContent;
        
        // Clonar el contenido sin el encabezado
        const bodyContent = readMoreCont.cloneNode(true);
        bodyContent.querySelector('h4').remove(); // Remover el encabezado del contenido clonado
        
        // Poblar el cuerpo del popup sin duplicar el encabezado
        popupBody.innerHTML = bodyContent.innerHTML;
        
        // Mostrar el popup
        popupBox.classList.add('open'); 
    });
});

// Cerrar el popup al hacer clic en el ícono de cerrar o en el botón
document.querySelectorAll('.popup-close-icon, .popup-close-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Ocultar la caja de popup
        this.closest('.popup-box').classList.remove('open');
    });
});

// Cerrar el popup al hacer clic fuera de él
document.querySelectorAll('.popup-box').forEach(popup => {
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.classList.remove('open'); // Ocultar el popup
        }
    });
});


