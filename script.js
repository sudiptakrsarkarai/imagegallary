
const buttons = document.querySelectorAll(".filter-btn");
const images = document.querySelectorAll(".image-card");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        images.forEach(img => {
            if (category === "all" || img.getAttribute("data-category") === category) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });

    });
});
