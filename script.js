async function loadProducts() {
    try {
        const response = await fetch('data.json');
        const titulos = await response.json();
        
        const container = document.getElementById('Titulo');
        container.innerHTML = ''; 
        
        titulos.forEach(titulo => {
            const card = document.createElement('div');
            card.className = 'product';
            
            const img = document.createElement('img');
            img.className = 'product-img';
            img.src = titulo.photo;
            img.alt = titulo.name;

            const title = document.createElement('div');
            title.className = 'product-title';
            title.textContent = titulo.name;
            
            card.appendChild(img);
            card.appendChild(title);
            
            card.addEventListener('click', () => openModal(titulo));
            container.appendChild(card);
        });
        
        setupModal();
        document.getElementById('year').textContent = new Date().getFullYear();
        
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
        alert('No se pudieron cargar las noticias. Verifica que el archivo data.json existe.');
    }
}

function setupModal() {
    const modal = document.getElementById('Titulo-modal');
    const closeButton = modal.querySelector('.modal-close');
    
    closeButton.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(noticia) {
    const modal = document.getElementById('Titulo-modal');
    
    modal.querySelector('.modal-img').src = noticia.photo;
    modal.querySelector('.modal-img').alt = noticia.name;
    modal.querySelector('.modal-title').textContent = noticia.name;
    modal.querySelector('.modal-desc').textContent = noticia.description || 'Sin descripción disponible';

    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('Titulo-modal');
    modal.classList.remove('show');
}

loadProducts();


