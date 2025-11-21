const buttons = document.querySelectorAll(".filter-btn");
const images = document.querySelectorAll(".image-card");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        buttons.forEach(b => b.classList.remove("active"));
        
        // Add active class to clicked button
        btn.classList.add("active");

        // Get category from button
        const category = btn.getAttribute("data-category");

        // Filter images with animation
        images.forEach((img, index) => {
            // Reset animation
            img.style.animation = 'none';
            
            if (category === "all" || img.getAttribute("data-category") === category) {
                setTimeout(() => {
                    img.style.display = "block";
                    img.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                }, 50);
            } else {
                img.style.display = "none";
            }
        });
    });
});

// Optional: Add click event to images for lightbox effect
images.forEach(img => {
    img.addEventListener("click", () => {
        const imgSrc = img.querySelector("img").src;
        const imgAlt = img.querySelector("img").alt;
        
        // Create lightbox
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="${imgSrc}" alt="${imgAlt}">
                <p class="lightbox-caption">${imgAlt}</p>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Add styles dynamically
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxContent = lightbox.querySelector(".lightbox-content");
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const lightboxImg = lightbox.querySelector("img");
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0,0,0,0.8);
        `;
        
        const closeBtn = lightbox.querySelector(".close-lightbox");
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 40px;
            color: white;
            cursor: pointer;
            font-weight: 300;
        `;
        
        const caption = lightbox.querySelector(".lightbox-caption");
        caption.style.cssText = `
            color: white;
            margin-top: 20px;
            font-size: 1.2em;
        `;
        
        // Close lightbox
        closeBtn.addEventListener("click", () => {
            lightbox.style.animation = "fadeOut 0.3s ease";
            setTimeout(() => lightbox.remove(), 300);
        });
        
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.animation = "fadeOut 0.3s ease";
                setTimeout(() => lightbox.remove(), 300);
            }
        });
    });
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);