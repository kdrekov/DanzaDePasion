// Конфигурация на галериите
const galleries = {
    coursesSalsa: {
        title: 'Курс по салса',
        images: [
            {
                src: 'images/course-1.jpg',
                title: 'Урок по салса',
                description: 'Първи стъпки в салсата'
            }
        ]
    },
    coursesBachata: {
        title: 'Курс по бачата',
        images: [
            {
                src: 'images/course-2.jpg',
                title: 'Урок по бачата',
                description: 'Първи стъпки в бачатата'
            }
        ]
    },
    SpringParty: {
        title: 'Пролетно парти',
        images: [
            {
                src: 'images/event-1.jpg', // Променено от event-2.jpg на event-1.jpg
                title: 'Пролетно парти',
                description: 'Май 2024'
            },
			{
                src: 'images/SpringParty/1.jpg', 
                title: 'Пролетно парти',
                description: 'Май 2024'
            },
			{
                src: 'images/SpringParty/2.jpg', 
                title: 'Пролетно парти',
                description: 'Май 2024'
            },
			{
                src: 'images/SpringParty/3.jpg', 
                title: 'Пролетно парти',
                description: 'Май 2024'
            },
			{
                src: 'images/SpringParty/4.jpg', 
                title: 'Пролетно парти',
                description: 'Май 2024'
            },
			{
                src: 'images/SpringParty/5.jpg', 
                title: 'Пролетно парти',
                description: 'Май 2024'
            },
			{
                src: 'images/SpringParty/6.jpg', 
                title: 'Пролетно парти',
                description: 'Май 2024'
            }
        ]
    },
    kotva2024: {
        title: 'Котва 2024',
        images: [
            {
                src: 'images/Kotva2024/gallery-1.JPG',
                title: 'Котва 2024',
                description: 'Февруари 2024'
            },
            {
                src: 'images/Kotva2024/gallery-2.JPG',
                title: 'Котва 2024',
                description: 'Февруари 2024'
            },
            {
                src: 'images/Kotva2024/gallery-3.JPG',
                title: 'Котва 2024',
                description: 'Февруари 2024'
            },
            {
                src: 'images/Kotva2024/gallery-4.JPG',
                title: 'Котва 2024',
                description: 'Февруари 2024'
            },
            {
                src: 'images/Kotva2024/gallery-5.JPG',
                title: 'Котва 2024',
                description: 'Февруари 2024'
            },
            {
                src: 'images/Kotva2024/gallery-6.JPG',
                title: 'Котва 2024',
                description: 'Февруари 2024'
            }
        ]
    }
};

// Глобални променливи
let currentGallery = null;
let currentIndex = 0;

// Функции за галерията
function openGalleryModal(galleryName, index) {
    console.log('Opening gallery:', galleryName, 'at index:', index);
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('gallery-modal-image');
    
    currentGallery = galleryName;
    currentIndex = index;
    
    const gallery = galleries[galleryName];
    if (!gallery) {
        console.error('Gallery not found:', galleryName);
        return;
    }
    
    const image = gallery.images[index];
    if (!image) {
        console.error('Image not found at index:', index);
        return;
    }
    
    modal.style.display = 'block';
    modalImg.src = image.src;
    
    // Когато изображението се зареди, преоразмеряваме го
    modalImg.onload = function() {
        const viewport = {
            width: window.innerWidth * 0.8,  // 80% от ширината на екрана
            height: window.innerHeight * 0.8  // 80% от височината на екрана
        };

        const imageRatio = this.naturalWidth / this.naturalHeight;
        const viewportRatio = viewport.width / viewport.height;
        
        let newWidth, newHeight;
        
        if (imageRatio > viewportRatio) {
            // Ако изображението е по-широко от прозореца
            newWidth = Math.min(viewport.width, this.naturalWidth);
            newHeight = newWidth / imageRatio;
        } else {
            // Ако изображението е по-високо от прозореца
            newHeight = Math.min(viewport.height, this.naturalHeight);
            newWidth = newHeight * imageRatio;
        }
        
        // Задаваме новите размери
        this.style.width = `${newWidth}px`;
        this.style.height = `${newHeight}px`;
        
        // Центрираме изображението
        this.style.position = 'fixed';
        this.style.top = '50%';
        this.style.left = '50%';
        this.style.transform = 'translate(-50%, -50%)';
    };
    
    updateGalleryNavigation();
}

// Добавяме слушател за преоразмеряване на прозореца
window.addEventListener('resize', function() {
    if (currentGallery !== null) {
        const modalImg = document.getElementById('gallery-modal-image');
        if (modalImg && modalImg.complete) { // проверяваме дали изображението е заредено
            modalImg.onload(); // преизчисляваме размерите
        }
    }
});

function closeGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function navigateGallery(direction) {
    const gallery = galleries[currentGallery];
    if (!gallery) return;
    
    currentIndex = (currentIndex + direction + gallery.images.length) % gallery.images.length;
    const image = gallery.images[currentIndex];
    
    const modalImg = document.getElementById('gallery-modal-image');
    if (image && modalImg) {
        modalImg.src = image.src;
        updateGalleryNavigation();
    }
}

function updateGalleryNavigation() {
    const prevBtn = document.querySelector('.gallery-modal-navigation.prev');
    const nextBtn = document.querySelector('.gallery-modal-navigation.next');
    const gallery = galleries[currentGallery];
    
    if (!gallery) return;
    
    if (gallery.images.length > 1) {
        if (prevBtn) prevBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Debug log
    
    // Initialize click handlers for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Found gallery items:', galleryItems.length); // Debug log
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default click behavior
            const galleryName = this.dataset.gallery;
            const index = parseInt(this.dataset.index) || 0;
            console.log('Clicked gallery item:', galleryName, 'index:', index); // Debug log
            openGalleryModal(galleryName, index);
        });
    });

    // Remove any existing duplicate modals
    const modals = document.querySelectorAll('.gallery-modal');
    if (modals.length > 1) {
        console.log('Removing duplicate modals'); // Debug log
        for (let i = 1; i < modals.length; i++) {
            modals[i].remove();
        }
    }

    // Initialize modal close buttons
    document.querySelectorAll('.gallery-modal-close').forEach(btn => {
        btn.addEventListener('click', closeGalleryModal);
    });

    // Initialize navigation buttons
    document.querySelectorAll('.gallery-modal-navigation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const direction = this.classList.contains('prev') ? -1 : 1;
            navigateGallery(direction);
        });
    });

    // Close modal when clicking outside the image
    document.querySelector('.gallery-modal').addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-modal')) {
            closeGalleryModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const modal = document.querySelector('.gallery-modal');
        if (modal && modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') navigateGallery(-1);
            if (e.key === 'ArrowRight') navigateGallery(1);
            if (e.key === 'Escape') closeGalleryModal();
        }
    });
});