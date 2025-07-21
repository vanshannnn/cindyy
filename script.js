const btn = document.getElementById("surpriseBtn");
const msg = document.getElementById("surpriseMsg");
const confetti = document.getElementById("confetti");

btn.addEventListener("click", () => {
  msg.classList.remove("hidden");
  startConfetti();
  btn.disabled = true;
  btn.innerText = "pibesde ya bocill!";
  // Mulai musik jika belum berjalan
  if (music.paused) {
    music.play();
    musicBtn.innerText = "⏸️ Musik";
    musicPlaying = true;
  }
});

// Confetti animation
const ctx = confetti.getContext("2d");
let confettiPieces = [];
function randomColor() {
  const colors = [
    "#ff69b4",
    "#ffb6c1",
    "#b2f0ff",
    "#fff8fc",
    "#e75480",
    "#f9c846",
    "#a3e635",
    "#f87171",
    "#fbbf24",
    "#38bdf8",
    "#a78bfa",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
function createConfettiPiece() {
  return {
    x: Math.random() * window.innerWidth,
    y: -20,
    r: Math.random() * 10 + 8,
    d: Math.random() * 50 + 10,
    color: randomColor(),
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncremental: Math.random() * 0.09 + 0.05,
  };
}
function resizeCanvas() {
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function startConfetti() {
  confettiPieces = Array.from({ length: 180 }, createConfettiPiece); // lebih banyak confetti
  requestAnimationFrame(drawConfetti);
  // Suara pop jika ada
  if (typeof playPopSound === "function") playPopSound();
}

function drawConfetti() {
  ctx.clearRect(0, 0, confetti.width, confetti.height);
  confettiPieces.forEach((p, i) => {
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += Math.cos(p.d) + 2 + p.r / 2;
    p.x += Math.sin(p.d);
    p.tiltAngle += p.tiltAngleIncremental;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    if (p.y > window.innerHeight) {
      confettiPieces[i] = createConfettiPiece();
      confettiPieces[i].y = -20;
    }
  });
  if (confettiPieces.length > 0) {
    requestAnimationFrame(drawConfetti);
  }
}

// Tambahkan fungsi playPopSound jika file suara tersedia
function playPopSound() {
  // Contoh: let pop = new Audio('img/pop.mp3'); pop.play();
}

// --- Animasi Balon/Hati Terbang ---
const floatingContainer = document.getElementById("floating-objects");
const floatingEmojis = [
  "🎂", // kue ultah
  "🎉", // confetti
  "🎁", // hadiah
  "🎈", // balon
  "🌸", // bunga
  "🌹", // bunga mawar
  "🧁", // cupcake
  "🍰", // potongan kue
  "🥳", // party face
  "🍦", // es krim
  "🍬", // permen
  "🍭", // lolipop
  "🪅", // pinata
];
function createFloating() {
  const el = document.createElement("div");
  el.className = "floating";
  el.innerText =
    floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
  el.style.left = Math.random() * 95 + "vw";
  el.style.fontSize = Math.random() * 1.5 + 1.2 + "em";
  el.style.animationDuration = Math.random() * 3 + 5 + "s";
  el.style.opacity = Math.random() * 0.5 + 0.5;
  floatingContainer.appendChild(el);
  setTimeout(() => floatingContainer.removeChild(el), 7000);
}
setInterval(createFloating, 700);

// --- Musik Ulang Tahun ---
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicToggle");
let musicPlaying = true;
music.volume = 0.5;
musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicBtn.innerText = "▶️ Musik";
  } else {
    music.play();
    musicBtn.innerText = "⏸️ Musik";
  }
  musicPlaying = !musicPlaying;
});

// --- Slider Galeri Foto ---
const galleryPhotos = [
  "img/WhatsApp Image 2025-07-18 at 10.17.46(1).jpeg",
  "img/WhatsApp Image 2025-07-18 at 10.17.46.jpeg",
  "img/WhatsApp Image 2025-07-18 at 10.17.47(1).jpeg",
  "img/WhatsApp Image 2025-07-18 at 10.17.47.jpeg",
];
let galleryIdx = 0;
const galleryImg = document.getElementById("galleryPhoto");
function changeGalleryPhoto(newIdx) {
  galleryImg.classList.remove("fade-in");
  galleryImg.classList.add("fade-out");
  setTimeout(() => {
    galleryImg.src = galleryPhotos[newIdx];
    galleryImg.classList.remove("fade-out");
    galleryImg.classList.add("fade-in");
  }, 200);
}
document.getElementById("prevPhoto").onclick = () => {
  galleryIdx = (galleryIdx - 1 + galleryPhotos.length) % galleryPhotos.length;
  changeGalleryPhoto(galleryIdx);
};
document.getElementById("nextPhoto").onclick = () => {
  galleryIdx = (galleryIdx + 1) % galleryPhotos.length;
  changeGalleryPhoto(galleryIdx);
};
// Set awal fade-in
if (galleryImg) galleryImg.classList.add("fade-in");

// --- Lightbox Galeri Foto ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
if (galleryImg && lightbox && lightboxImg && lightboxBackdrop) {
  galleryImg.addEventListener("click", () => {
    lightboxImg.src = galleryPhotos[galleryIdx];
    lightbox.classList.remove("hidden");
  });
  lightboxBackdrop.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  });
}

// --- Kue Ulang Tahun: Lilin Bisa Ditiup & Card Make a Wish ---
const flame = document.getElementById("flame");
const candle = flame.parentElement;
const mainCard = document.querySelector(".container");
const makeAWishCard = document.getElementById("makeAWishCard");
const nextCard = document.getElementById("nextCard");

candle.addEventListener("click", () => {
  // Mulai musik jika belum berjalan
  if (music.paused) {
    music.play();
    musicBtn.innerText = "⏸️ Musik";
    musicPlaying = true;
  }
  flame.style.display = "none";
  setTimeout(() => {
    mainCard.style.display = "none";
    makeAWishCard.classList.remove("hidden");
    // Event untuk tombol next di card Make a Wish
    document.getElementById("nextCardBtn").onclick = () => {
      makeAWishCard.classList.add("hidden");
      nextCard.classList.remove("hidden");
    };
    // Event untuk tombol kembali ke awal di card selanjutnya
    document.getElementById("backToStartBtn").onclick = () => {
      nextCard.classList.add("hidden");
      mainCard.style.display = "";
      flame.style.display = "block";
    };
  }, 600);
});

// --- Typewriter Effect untuk Judul ---
window.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.getElementById("typewriter-title");
  if (typewriter) {
    const text = typewriter.getAttribute("data-text");
    typewriter.innerText = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        typewriter.innerText += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }
    type();
  }
  document.querySelector(".container").style.display = "";
  if (document.getElementById("afterBlowCard")) {
    document.getElementById("afterBlowCard").classList.add("hidden");
  }
});
