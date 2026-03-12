let imSlider = document.getElementById("imageSlider");
let slides = Array.from(imSlider.getElementsByClassName("slide"));

slides.forEach(slide => {
    slide.addEventListener("mouseenter", () => {
        const caption = slide.querySelector(".caption");
        caption.style.display = "block";
    })
    slide.addEventListener("mouseleave", () => {
        const caption = slide.querySelector(".caption");
        caption.style.display = "none";
    })
})