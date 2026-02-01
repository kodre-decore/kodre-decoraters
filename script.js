// ===== PREMIUM INDIAN EVENT DECOR JAVASCRIPT =====

// Global Variables
let scene, camera, renderer;
let heroScene, mandapScene, stageScene;
let isMenuOpen = false;

// ===== SOCIAL MEDIA HANDLER =====
function handleSocialClick(platform, url) {
    console.log(`Social media clicked: ${platform}`);
    
    // Track the click (you can add analytics here)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'platform': platform,
            'url': url
        });
    }
    
    // Show a brief confirmation
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gold);
        color: var(--dark-wood);
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: var(--shadow-medium);
    `;
    message.textContent = `Opening ${platform}...`;
    document.body.appendChild(message);
    
    // Remove message after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
    
    // Return true to allow the link to open
    return true;
}

// Add CSS animation for the notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== ICON FALLBACK HANDLER =====
function initializeIconFallbacks() {
    // Check if Font Awesome is loaded
    function isFontAwesomeLoaded() {
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-test';
        testElement.style.display = 'none';
        document.body.appendChild(testElement);
        
        const styles = window.getComputedStyle(testElement);
        const isLoaded = styles.fontFamily.includes('Font Awesome');
        
        document.body.removeChild(testElement);
        return isLoaded;
    }
    
    // If Font Awesome is not loaded, add fallback classes
    if (!isFontAwesomeLoaded()) {
        console.log('Font Awesome not loaded, adding emoji fallbacks');
        document.body.classList.add('no-fontawesome');
        
        // Add data-icon attributes for fallback
        const iconMap = {
            'fa-heart': '♥',
            'fa-briefcase': '💼',
            'fa-diwali': '🪔',
            'fa-champagne-glasses': '🥂',
            'fa-microphone': '🎤',
            'fa-rocket': '🚀',
            'fa-trophy': '🏆',
            'fa-users': '👥',
            'fa-phone': '📞',
            'fa-envelope': '✉️',
            'fa-map-marker-alt': '📍',
            'fa-calendar': '📅',
            'fa-calendar-check': '📅',
            'fa-paper-plane': '✈️',
            'fa-images': '🖼️',
            'fa-expand': '⬜',
            'fa-check': '✓',
            'fa-facebook': 'f',
            'fa-instagram': '📷',
            'fa-pinterest': 'P',
            'fa-whatsapp': '💬'
        };
        
        // Replace icons with fallbacks
        document.querySelectorAll('i').forEach(icon => {
            const classes = icon.className.split(' ');
            const iconClass = classes.find(cls => cls.startsWith('fa-') && !cls.includes('fa-'));
            
            if (iconClass && iconMap[iconClass]) {
                icon.setAttribute('data-icon', iconMap[iconClass]);
                icon.classList.add('icon-fallback');
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeIconFallbacks();
    
    // Test social links functionality
    console.log('Testing social links...');
    const socialLinks = document.querySelectorAll('.social-links a');
    console.log('Found social links:', socialLinks.length);
    
    socialLinks.forEach((link, index) => {
        console.log(`Social link ${index}:`, link.href, link.onclick);
    });
});

function initializeApp() {
    initializeNavigation();
    initialize3DScenes();
    initializeGallery();
    initializeForms();
    initializeAnimations();
    initializeScrollEffects();
    console.log('Kodre Decorater initialized successfully!');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (isMenuOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    mobileToggle.click();
                }
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== 3D SCENES =====
function initialize3DScenes() {
    // Hero 3D scene removed - using normal background
    console.log('3D scenes disabled - using normal backgrounds');
}

function initMandapScene() {
    const container = document.getElementById('mandap-3d');
    if (!container) return;

    // Create enhanced mandap scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x722F37, 5, 20);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 3, 8);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffd700, 1);
    spotLight.position.set(0, 10, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Grand mandap platform
    const platformGeometry = new THREE.CylinderGeometry(5, 5, 0.2, 12);
    const platformMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.1
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.receiveShadow = true;
    scene.add(platform);

    // Decorative pillars
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 8);
        const pillarMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8b4513,
            specular: 0xffd700
        });
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(Math.cos(angle) * 3, 3, Math.sin(angle) * 3);
        pillar.castShadow = true;
        scene.add(pillar);

        // Pillar top decoration
        const topGeometry = new THREE.SphereGeometry(0.5, 8, 8);
        const topMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffd700,
            emissive: 0xffd700,
            emissiveIntensity: 0.2
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.set(Math.cos(angle) * 3, 6.5, Math.sin(angle) * 3);
        scene.add(top);
    }

    // Floral decorations
    for (let i = 0; i < 15; i++) {
        const flowerGeometry = new THREE.SphereGeometry(0.1, 6, 6);
        const flowerMaterial = new THREE.MeshPhongMaterial({ 
            color: Math.random() > 0.5 ? 0xff69b4 : 0xff1493,
            emissive: Math.random() > 0.5 ? 0xff69b4 : 0xff1493,
            emissiveIntensity: 0.1
        });
        const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
        flower.position.set(
            (Math.random() - 0.5) * 8,
            Math.random() * 4,
            (Math.random() - 0.5) * 8
        );
        scene.add(flower);
    }

    // Hanging lanterns
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const lanternGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const lanternMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff9933,
            emissive: 0xff9933,
            emissiveIntensity: 0.3
        });
        const lantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
        lantern.position.set(Math.cos(angle) * 4, 5, Math.sin(angle) * 4);
        scene.add(lantern);
    }

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate scene
        scene.rotation.y += 0.005;
        
        // Float lanterns
        scene.children.forEach((child, index) => {
            if (child.geometry && child.geometry.type === 'SphereGeometry') {
                child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            }
        });
        
        renderer.render(scene, camera);
    }
    animate();
}

function initStageScene() {
    const container = document.getElementById('stage-3d');
    if (!container) return;

    // Create enhanced corporate stage scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1e3a8a, 5, 20);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 4, 10);

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Colored accent lights
    const blueLight = new THREE.PointLight(0x3b82f6, 0.5, 10);
    blueLight.position.set(-5, 5, 0);
    scene.add(blueLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 0.5, 10);
    goldLight.position.set(5, 5, 0);
    scene.add(goldLight);

    // Main stage platform
    const stageGeometry = new THREE.BoxGeometry(8, 0.3, 4);
    const stageMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1e3a8a,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.1
    });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.receiveShadow = true;
    scene.add(stage);

    // Stage backdrop
    const backdropGeometry = new THREE.PlaneGeometry(10, 6);
    const backdropMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1f2937,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.1
    });
    const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
    backdrop.position.set(0, 3, -2);
    scene.add(backdrop);

    // Podium/Lectern
    const podiumGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.6);
    const podiumMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x374151,
        specular: 0x9ca3af
    });
    const podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
    podium.position.set(0, 0.75, 1);
    podium.castShadow = true;
    scene.add(podium);

    // Professional spotlights
    for (let i = 0; i < 3; i++) {
        const spotlightGroup = new THREE.Group();
        
        // Spotlight beam
        const beamGeometry = new THREE.ConeGeometry(0.3, 3, 8);
        const beamMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.1
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.set(0, -1.5, 0);
        beam.rotation.x = Math.PI;
        spotlightGroup.add(beam);

        // Spotlight fixture
        const fixtureGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.4, 8);
        const fixtureMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x6b7280,
            metallic: true
        });
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
        spotlightGroup.add(fixture);

        const x = (i - 1) * 3;
        spotlightGroup.position.set(x, 5, -3);
        spotlightGroup.lookAt(0, 0, 0);
        scene.add(spotlightGroup);
    }

    // Decorative elements (corporate branding areas)
    for (let i = 0; i < 2; i++) {
        const signGeometry = new THREE.BoxGeometry(2, 1, 0.1);
        const signMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf59e0b,
            emissive: 0xf59e0b,
            emissiveIntensity: 0.1
        });
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.set((i - 0.5) * 6, 2, -1.9);
        scene.add(sign);
    }

    // Floor lighting effects
    const floorLightGeometry = new THREE.RingGeometry(1, 2, 8);
    const floorLightMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.3
    });
    const floorLight = new THREE.Mesh(floorLightGeometry, floorLightMaterial);
    floorLight.rotation.x = -Math.PI / 2;
    floorLight.position.set(0, 0.16, 0);
    scene.add(floorLight);

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        
        // Slow rotation for dramatic effect
        scene.rotation.y += 0.003;
        
        // Pulsing lights
        const time = Date.now() * 0.001;
        scene.children.forEach((child, index) => {
            if (child.material && child.material.emissiveIntensity) {
                child.material.emissiveIntensity = 0.1 + Math.sin(time + index) * 0.05;
            }
        });
        
        renderer.render(scene, camera);
    }
    animate();
}

// ===== GALLERY =====
function initializeGallery() {
    const galleryData = [
        { id: 1, category: 'wedding', title: 'Royal Wedding Setup', description: 'Traditional mandap with modern elegance', customImage: 'royal-wedding-photo.jpg' },
        { id: 2, category: 'wedding', title: 'Lighting', description: 'Professional lighting setup and design', customImage: 'lighting-photo.jpg' },
        { id: 3, category: 'festival', title: 'Decoration of God', description: 'Traditional religious decoration setup', customImage: 'god-decoration-photo.jpg' },
        { id: 4, category: 'wedding', title: 'Luxury Wedding Decor', description: 'Premium mandap design by Kodre Decorater', customImage: 'wedding-mandap-photo.jpg' },
        { id: 5, category: 'wedding', title: 'Decoration', description: 'Professional decoration setup and design', customImage: 'decoration-photo.jpg' },
        { id: 6, category: 'festival', title: 'Ganesh Festival', description: 'Traditional festival decoration', customImage: 'wedding-stage-photo.jpg' },
        { id: 7, category: 'festival', title: 'Ganpati Festival', description: 'Traditional Ganpati celebration setup', customImage: 'ganpati-festival-photo.jpg' }
    ];

    loadGalleryItems(galleryData);
    initializeGalleryFilters();
}

function loadGalleryItems(items) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        
        // Use beautiful placeholder images from Unsplash with Indian wedding/corporate themes
        const imageUrls = {
            wedding: [
                'https://images.unsplash.com/photo-1511795944217-093c542a6a11?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1519224016866-46a81134ebc5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1469366243766-75518d9768e2?w=400&h=300&fit=crop'
            ],
            corporate: [
                'https://images.unsplash.com/photo-1540575498343-5d5a8f3b2362?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1515168834164-7eaeb8a5d77d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=400&h=300&fit=crop'
            ],
            festival: [
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1605478324006-e4885399c1f2?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
            ]
        };
        
        const categoryImages = imageUrls[item.category] || imageUrls.wedding;
        const imageUrl = item.customImage || categoryImages[item.id % categoryImages.length];
        
        galleryItem.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <div class="gallery-meta">
                    <span class="category-tag">${item.category}</span>
                    <button class="view-btn" onclick="viewGalleryDetail(${item.id})">
                        <i class="fas fa-expand"></i> View Details
                    </button>
                </div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openGalleryModal(item));
        galleryGrid.appendChild(galleryItem);
    });
}

function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            const filter = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

function openGalleryModal(item) {
    // Create enhanced modal with full image view
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 90%;
        max-height: 93%;
        overflow: hidden;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    // Get the full-size image URL
    const imageUrls = {
        wedding: [
            'https://images.unsplash.com/photo-1511795944217-093c542a6a11?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1519224016866-46a81134ebc5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1469366243766-75518d9768e2?w=800&h=600&fit=crop'
        ],
        corporate: [
            'https://images.unsplash.com/photo-1540575498343-5d5a8f3b2362?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1515168834164-7eaeb8a5d77d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&h=600&fit=crop'
        ],
        festival: [
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1605478324006-e4885399c1f2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'
        ]
    };
    
    const categoryImages = imageUrls[item.category] || imageUrls.wedding;
    const imageUrl = item.customImage || categoryImages[item.id % categoryImages.length];
    
    content.innerHTML = `
        <button onclick="this.closest('div').parentElement.remove()" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--maroon);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            font-size: 1.5rem;
        ">&times;</button>
        <div style="display: flex; flex-wrap: wrap; max-width: 1100px;">
            <div style="flex: 1; min-width: 380px; max-width: 600px;">
                <img src="${imageUrl}" alt="${item.title}" style="width: 100%; height: auto; max-height: 500px; object-fit: contain; display: block;">
            </div>
            <div style="flex: 1; min-width: 320px; padding: 1.8rem; background: var(--ivory);">
                <h2 style="font-family: var(--font-serif); color: var(--maroon); margin-bottom: 1rem; font-size: 1.5rem;">${item.title}</h2>
                <span style="background: var(--gold); color: var(--dark-wood); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; text-transform: uppercase; font-weight: 600;">${item.category}</span>
                <p style="margin: 1.5rem 0; line-height: 1.6; color: var(--charcoal); font-size: 1rem;">${item.description}</p>
                <div style="margin-top: 2rem;">
                    <h4 style="color: var(--maroon); margin-bottom: 0.5rem;">Event Details</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--gold); margin-right: 0.5rem;"></i> Premium decor setup</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--gold); margin-right: 0.5rem;"></i> Professional lighting</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--gold); margin-right: 0.5rem;"></i> Custom theme design</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--gold); margin-right: 0.5rem;"></i> On-site coordination</li>
                    </ul>
                </div>
                <button onclick="openQuoteForm(); this.closest('div').parentElement.remove();" style="
                    background: linear-gradient(135deg, var(--gold), var(--turmeric));
                    color: var(--dark-wood);
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 2rem;
                    width: 100%;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                ">Get Quote for Similar Event</button>
            </div>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function viewGalleryDetail(itemId) {
    // Find the item and open modal
    const galleryData = [
        { id: 1, category: 'wedding', title: 'Royal Wedding Setup', description: 'Traditional mandap with modern elegance', customImage: 'royal-wedding-photo.jpg' },
        { id: 2, category: 'wedding', title: 'Lighting', description: 'Professional lighting setup and design', customImage: 'lighting-photo.jpg' },
        { id: 3, category: 'festival', title: 'Decoration of God', description: 'Traditional religious decoration setup', customImage: 'god-decoration-photo.jpg' },
        { id: 4, category: 'wedding', title: 'Luxury Wedding Decor', description: 'Premium mandap design by Kodre Decorater', customImage: 'wedding-mandap-photo.jpg' },
        { id: 5, category: 'wedding', title: 'Decoration', description: 'Professional decoration setup and design', customImage: 'decoration-photo.jpg' },
        { id: 6, category: 'festival', title: 'Ganesh Festival', description: 'Traditional festival decoration', customImage: 'wedding-stage-photo.jpg' },
        { id: 7, category: 'festival', title: 'Ganpati Festival', description: 'Traditional Ganpati celebration setup', customImage: 'ganpati-festival-photo.jpg' }
    ];
    
    const item = galleryData.find(i => i.id === itemId);
    if (item) {
        openGalleryModal(item);
    }
}

// ===== FORMS =====
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitInquiry);
    }

    // Quick quote form
    const quickQuoteForm = document.getElementById('quick-quote-form');
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener('submit', submitQuickQuote);
    }

    // Initialize date input formatting
    initializeDateInput();
}

function initializeDateInput() {
    const dateInput = document.getElementById('event-date');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Format date for display
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const formattedDate = formatDateDDMMYY(selectedDate);
            console.log('Selected date:', formattedDate);
        });
        
        // Mobile date input enhancement - simplified approach
        if (isMobileDevice()) {
            // Remove readonly to allow native mobile date picker
            dateInput.removeAttribute('readonly');
            dateInput.removeAttribute('inputmode');
            
            // Add mobile-friendly styling
            dateInput.style.fontSize = '16px'; // Prevent zoom on iOS
            dateInput.style.padding = '12px';
            dateInput.style.backgroundColor = 'var(--ivory)';
            dateInput.style.border = '2px solid var(--gold)';
            dateInput.style.borderRadius = '8px';
        }
    }
}

function formatDateDDMMYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function submitInquiry(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Add form type for identification
    formData.append('form_type', 'General Inquiry');
    formData.append('submission_time', new Date().toLocaleString());
    
    // Format date for display
    if (formData.get('event-date')) {
        const date = new Date(formData.get('event-date'));
        formData.append('formatted-date', formatDateDDMMYY(date));
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
            form.reset();
            setTimeout(() => initializeDateInput(), 100);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Sorry, there was an error sending your inquiry. Please try again.', 'error');
    })
    .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function submitQuickQuote(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Add form type for identification
    formData.append('form_type', 'Quick Quote Request');
    formData.append('submission_time', new Date().toLocaleString());
    
    // Format date for display
    if (formData.get('event-date')) {
        const date = new Date(formData.get('event-date'));
        formData.append('formatted-date', formatDateDDMMYY(date));
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Thank you! Our team will contact you shortly with your personalized quote.', 'success');
            closeQuoteForm();
            form.reset();
            setTimeout(() => initializeDateInput(), 100);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Sorry, there was an error sending your quote request. Please try again.', 'error');
    })
    .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gold)' : 'var(--maroon)'};
        color: ${type === 'success' ? 'var(--dark-wood)' : 'white'};
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: var(--shadow-medium);
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== MODALS =====
function openQuoteForm() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeQuoteForm() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Click outside modal to close
document.addEventListener('click', function(event) {
    const modal = document.getElementById('quote-modal');
    if (modal && event.target === modal) {
        closeQuoteForm();
    }
});

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .wedding-feature, .corporate-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // GSAP animations for premium feel
    if (typeof gsap !== 'undefined') {
        // Hero content animation
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.hero-subtitle', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });

        gsap.from('.hero-actions', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            delay: 0.6,
            ease: 'power3.out'
        });

        // Service cards animation
        gsap.from('.service-card', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top 80%'
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== WINDOW RESIZE HANDLING =====
window.addEventListener('resize', function() {
    // Handle 3D scene resize for remaining scenes only
    if (camera && renderer) {
        // Only resize non-hero 3D scenes
        const mandapContainer = document.getElementById('mandap-3d');
        if (mandapContainer) {
            camera.aspect = mandapContainer.clientWidth / mandapContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mandapContainer.clientWidth, mandapContainer.clientHeight);
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(updateActiveNav, 100);
window.addEventListener('scroll', optimizedScroll);

// ===== LOADING STATES =====
window.addEventListener('load', function() {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== ACCESSIBILITY =====
// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuoteForm();
    }
});

// Focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

console.log('Kodre Decorater script loaded successfully!');
