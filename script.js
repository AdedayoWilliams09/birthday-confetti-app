const confettiArea = document.getElementById("confetti-area");
const featuredWishEl = document.getElementById("featured-wish");
const toggleBtn = document.getElementById("toggleBtn");
const densityInput = document.getElementById("density");
const soundBtn = document.getElementById("soundBtn");
const bgMusic = document.getElementById("bg-music");
const centerImage = document.querySelector(".center-image img");

document.getElementById("year").textContent = new Date().getFullYear();

let running = true;
let spawnTimer = null;
let soundOn = false;

const wishes = [
  "Happy Birthday Adedayo 🎂","Cheers to you 🥂","Many happy returns 🎉","You are loved ❤️", "Happy Birthday Dayo mi",
  "Dream big 💭","Smile wide 😄","Cake time 🍰","Celebrate yourself 🎊","Dance like nobody’s watching 💃",
  "Adedayo, you rock 🎸","Happy birthday boo 🎉🎉","Happiest birthday my fweeeeeennndddddd", "Stay awesome 🆒","Keep winning 🏆","More life 🥳","Positive vibes only ✨",
  "Be unstoppable 💪","Make today magical ✨","Have fun 🎠","Party mode ON 🎶","Glow up ✨","Stay golden 🌞",
  "Another year of awesome!","I celebrate you today and always", "May this be your best year yet", "God will give you gifts money can't but", "Adedayo the legend 🏅","Grateful for you 🙏","Stay unique 🦄",
  "More beautiful life 🌸","Good vibes 🔆","Wishing you success 📈","Adventure awaits 🗺️","MGL Sir", "Good health, strength, wisdom and guidance",
  "Grow wiser 🌱","Stay kind 💗","Make memories 📸","Birthday king 🤴","Laugh loud 😂","Cheers to your new age",
  "Treasure every moment ⏳","Dare to dream 🌌","May lines fall in pleasant places for you", "Happiness overload 🎆","Party vibes 🎈", "May Almighty God perfect all that concerns you",
  "Stay cheerful 😍","Warm hugs 🤗","Love yourself 💕","Stay peaceful 🕊️","Enjoy the ride 🚀",
  "Sweetest wishes 🍭","Stay grateful 🙏","Wish granted 🪄","Happy Birthday Deeone","Turn up the fun 🔊",
  "Adedayo, we celebrate you 🎉","Celebrate love 💞","More laughter 🤣","Be happy 😊", "Success and happiness, love and laughter, peace and prosperity",
  "Stay blessed ✝️","Be fearless 🦁","Stay humble 🌿","Make today count ✅","Radiate joy ☀️", "Keep winning bro",
  "Create magic 🪄","Shine like gold 🏅","Love and light 🕯️","Dream & achieve 🏆", "May God bless you",
  "Cheers to adventures ✈️","Glow brighter 💡","Birthday bliss 🌸","Stay unstoppable 🔥", "Happy birthday bro",
  "Grateful heart 💛","Have a blast 💥","Your day, your rules 💃","You are magic ✨",
  "Slay today 👑","Good energy only 🔆","Shine on 🌈","Be proud 🌟","Stay loved ❤️", "Good health, Success, Wealth"
];

// 🎯 Featured wishes (special messages)
const featuredWishes = [
  "🎉 You're One of a Kind, Adedayo! 🎉",
  "✨ Another Year Wiser, Stronger, Better ✨",
  "💛 Wishing You Endless Joy & Love 💛",
 
  "🎂 Cheers to Your Amazing Journey 🎂",
  "🌟 Keep Shining, The World Needs Your Light 🌟"
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeConfetti() {
  const el = document.createElement("div");
  el.className = "confetti";

  const size = Math.round(rand(18, 26));
  el.style.fontSize = size + "px";
  el.style.left = rand(0, 100) + "%";

  const colors = ["#FFD700", "#E6A8A1", "#F5DEB3", "#FFF8DC", "#D3D3D3"];
  el.style.background = colors[Math.floor(Math.random() * colors.length)];
  el.style.color = "#2C2C2C";
  el.textContent = pick(wishes);

  const dur = rand(5000, 9000);
  el.style.animation = `fall ${dur}ms linear`;
  confettiArea.appendChild(el);

  setTimeout(() => el.remove(), dur);
}

function showFeaturedWish() {
  const message = pick(featuredWishes);
  featuredWishEl.textContent = message;
  featuredWishEl.classList.add("show");

  setTimeout(() => {
    featuredWishEl.classList.remove("show");
  }, 4000);
}

function spawnLoop() {
  const density = parseInt(densityInput.value, 10);
  for (let i = 0; i < Math.max(1, Math.round(rand(1, density / 3))); i++) {
    makeConfetti();
  }

  // Occasionally trigger a featured wish (about every 10–15 seconds)
  if (Math.random() < 0.01) {
    showFeaturedWish();
  }

  const interval = Math.max(80, 1400 / Math.max(1, density));
  spawnTimer = setTimeout(() => {
    if (running) requestAnimationFrame(spawnLoop);
  }, interval);
}

toggleBtn.addEventListener("click", () => {
  running = !running;
  toggleBtn.textContent = running ? "Pause" : "Play";
  if (running) spawnLoop();
  else clearTimeout(spawnTimer);
});

soundBtn.addEventListener("click", () => {
  if (!soundOn) {
    bgMusic.play().catch(err => console.log("Autoplay blocked, user interaction required."));
    soundBtn.textContent = "🔇";
    soundOn = true;
    centerImage.classList.add("glowing");
  } else {
    bgMusic.pause();
    soundBtn.textContent = "🔊";
    soundOn = false;
    centerImage.classList.remove("glowing");
  }
});

spawnLoop();
