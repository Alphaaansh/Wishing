// ==========================================
// ✏️ EDIT YOUR DETAILS HERE
// ==========================================
const CONFIG = {
  receiverName: "Rashi",
  senderName: "Ajit",
  age: "18",

  reasons: [
    "Every single day with you is filled with genuine laughter 💖",
    "Your positivity is infectious and lifts everyone around you ✨",
    "You're the most trustworthy and patient listener 😊",
    "You turn ordinary moments into unforgettable memories 🌸",
    "You inspire me every day to work harder and dream bigger🌟"
  ],

  // Place your photos in the img/ folder and match filenames here:
  photos: [
    {
      src: "img/photo1.jpg",
      caption: "Your smile lights up every single room 🌸"
    },
    {
      src: "img/photo2.jpg",
      caption: "To all the endless laughs and crazy conversations ✨"
    },
    {
      src: "img/photo3.jpg",
      caption: "Thank you for being the most genuine friend 💖"
    }
  ],

  letter: "Every year I try to find the perfect words to tell you how much your friendship means to me, and every year words fall short. You make my most ordinary days feel worth remembering. Thank you for simply being you. Happy Birthday!"
};

// ==========================================
// 🚀 LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".receiver-name").forEach(el => el.textContent = CONFIG.receiverName);
  document.querySelectorAll(".sender-name").forEach(el => el.textContent = CONFIG.senderName);
  document.querySelectorAll(".receiver-age").forEach(el => el.textContent = CONFIG.age);
  const seal = document.getElementById("sealInitial");
  if (seal) seal.textContent = CONFIG.senderName.charAt(0);

  updateCarousel();
});

function nextScreen(screenNumber) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(`screen-${screenNumber}`);
  if (target) {
    target.classList.add("active");
  }
  if (screenNumber === 6) {
    launchConfettiStorm();
  }
}

let candleBlown = false;
function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;
  document.getElementById("flame").classList.add("blown-out");
  document.getElementById("candleStatus").textContent = "✨ Wish granted! ✨";
  confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  document.getElementById("btn-cake-next").style.display = "inline-flex";
}

let poppedCount = 0;
function popBalloon(index, el) {
  if (el.style.visibility === "hidden") return;
  el.style.visibility = "hidden";
  confetti({ particleCount: 30, spread: 50, origin: { y: 0.4 } });

  const list = document.getElementById("reasonsList");
  const card = document.createElement("div");
  card.className = "reason-card";
  card.innerHTML = `
    <div class="badge">Reason #${index + 1}</div>
    <div class="msg">${CONFIG.reasons[index]}</div>
  `;
  list.appendChild(card);

  poppedCount++;
  if (poppedCount >= 3) {
    document.getElementById("btn-reasons-next").style.display = "inline-flex";
  }
}

let currentSlide = 0;
function updateCarousel() {
  const imgEl = document.getElementById("polaroid-img");
  const capEl = document.getElementById("polaroid-caption");
  const indEl = document.getElementById("slideIndicator");

  const current = CONFIG.photos[currentSlide];
  imgEl.src = current.src;
  capEl.textContent = current.caption;
  indEl.textContent = `${currentSlide + 1} / ${CONFIG.photos.length}`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % CONFIG.photos.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  updateCarousel();
}

let letterOpened = false;
function openLetter() {
  if (letterOpened) return;
  letterOpened = true;
  confetti({ particleCount: 60, spread: 70 });
  document.getElementById("envelopeBox").style.display = "none";
  document.getElementById("letterSheet").style.display = "block";

  const target = document.getElementById("typewriterBody");
  let i = 0;
  const interval = setInterval(() => {
    if (i < CONFIG.letter.length) {
      target.textContent += CONFIG.letter.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      document.getElementById("btn-letter-next").style.display = "inline-flex";
    }
  }, 35);
}

function launchConfettiStorm() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
