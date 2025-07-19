const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const searchInput = document.getElementById("searchInput");
let currentImageIndex = 0;

let images = [
  { src: "images/nature1.jpeg", category: "nature", caption: "Forest Path" },
  { src: "images/tech1.jpeg", category: "tech", caption: "Motherboard" },
  { src: "images/tech2.jpeg", category: "tech", caption: "Camera" },
  { src: "images/art1.jpeg", category: "art", caption: "Color Splash" },
  { src: "images/art2.jpeg", category: "art", caption: "Colorful Women's Face" },
  { src: "images/travel1.jpeg", category: "travel", caption: "Paris View" },
  { src: "images/food1.jpeg", category: "food", caption: "Pizza Time" },
  { src: "images/food2.jpeg", category: "food", caption: "Briyani" },
  { src: "images/animals1.jpeg", category: "animals", caption: "Cute Puppy" },
  { src: "images/animals2.jpeg", category: "animals", caption: "Tigers" },
  { src: "images/space1.jpeg", category: "space", caption: "Milky Way" },
  { src: "images/nature2.jpeg", category: "nature", caption: "Mountain View" },
];

function renderGallery(imageList = images) {
  gallery.innerHTML = "";
  imageList.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = `gallery-item ${img.category}`;
    const liked = localStorage.getItem(img.src) === "true" ? "❤️" : "🤍";
    item.innerHTML = `
      <span class="like-btn" onclick="toggleLike('${img.src}', this)">${liked}</span>
      <img src="${img.src}" alt="${img.caption}" onclick="openLightbox(${index})" />
      <div class="caption">${img.caption}</div>
    `;
    gallery.appendChild(item);
  });
}
renderGallery();

function openLightbox(index) {
  currentImageIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentImageIndex].src;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentImageIndex].src;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  lightboxImg.src = images[currentImageIndex].src;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function searchImages() {
  const query = searchInput.value.toLowerCase();
  const filtered = images.filter(img => img.caption.toLowerCase().includes(query));
  renderGallery(filtered);
}

function filterImages(category) {
  if (category === "all") {
    renderGallery(images);
  } else {
    const filtered = images.filter(img => img.category === category);
    renderGallery(filtered);
  }
}

function uploadImage() {
  const input = document.getElementById("uploadInput");
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const newImg = {
        src: e.target.result,
        category: "uploaded",
        caption: file.name
      };
      images.unshift(newImg);
      renderGallery(images);
    };
    reader.readAsDataURL(file);
  }
}

function toggleLike(src, btn) {
  const liked = localStorage.getItem(src) === "true";
  localStorage.setItem(src, !liked);
  btn.textContent = !liked ? "❤️" : "🤍";
}