const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const stars = [];

function createStar() {
  const geometry = new THREE.SphereGeometry(0.02, 8, 8);
  const star = new THREE.Mesh(geometry, starMaterial);
  const glow = new THREE.PointLight(0x88ccff, 1, 1.5);
  glow.position.set(0, 0, 0);
  star.add(glow);
  star.position.set(
    Math.random() * 20 - 10,
    Math.random() * 10 + 5,
    Math.random() * 20 - 10
  );
  scene.add(star);
  stars.push(star);
}

for (let i = 0; i < 300; i++) {
  createStar();
}

const animate = function () {
  requestAnimationFrame(animate);

  stars.forEach(star => {
    star.position.y -= 0.02;
    star.position.x -= 0.01;
    if (star.position.y < -5 || star.position.x < -15) {
      star.position.y = Math.random() * 10 + 5;
      star.position.x = Math.random() * 20 - 10;
      star.position.z = Math.random() * 20 - 10;
    }
  });

  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('show');
      hamburger.classList.toggle('open');
    });
  }

  const video = document.getElementById('introVideo');
  let scale = 1;

  if (video) {
    video.style.transform = 'translate(-50%, -50%) scale(1)';
    video.style.transition = 'transform 1s ease-in-out';

    setInterval(() => {
      scale += 0.2;
      video.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }, 1000);
  }
});

function validateForm() {
  let isValid = true;

  const firstName = document.getElementById('firstName');
  const firstNameError = document.getElementById('firstNameError');
  if (firstName && firstNameError) {
    if (firstName.value.trim() === '') {
      firstNameError.style.display = 'block';
      isValid = false;
    } else {
      firstNameError.style.display = 'none';
    }
  }

  const lastName = document.getElementById('lastName');
  const lastNameError = document.getElementById('lastNameError');
  if (lastName && lastNameError) {
    if (lastName.value.trim() === '') {
      lastNameError.style.display = 'block';
      isValid = false;
    } else {
      lastNameError.style.display = 'none';
    }
  }

  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (email && emailError) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      emailError.style.display = 'block';
      isValid = false;
    } else {
      emailError.style.display = 'none';
    }
  }

  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');
  if (phone && phoneError) {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value)) {
      phoneError.style.display = 'block';
      isValid = false;
    } else {
      phoneError.style.display = 'none';
    }
  }

  const message = document.getElementById('message');
  const messageError = document.getElementById('messageError');
  if (message && messageError) {
    if (message.value.trim() === '') {
      messageError.style.display = 'block';
      isValid = false;
    } else {
      messageError.style.display = 'none';
    }
  }

  if (isValid) {
    alert('Thank you for your message! We will get back to you soon.');
  }

  return isValid;
}

let showDay = 1;
function toggleDay() {
  showDay = showDay === 1 ? 2 : 1;
  document.getElementById('sliderIndicator').style.left = showDay === 1 ? '0%' : '50%';

  const day1 = document.getElementById('day1');
  const day2 = document.getElementById('day2');

  day1.classList.remove('active');
  day2.classList.remove('active');

  setTimeout(() => {
    if (showDay === 1) {
      day1.classList.add('active');
    } else {
      day2.classList.add('active');
    }
  }, 10);
}

const events = [
  { day: "Day 1", name: "Bulls & Bears - Mockstock" },
  { day: "Day 1", name: "Nautanki - Mime" },
  { day: "Day 1", name: "Marketing Event - Big Pitcher" },
  { day: "Day 1", name: "Battle of Words - Debate" },
  { day: "Day 1", name: "Maathu Manthana - Kannada Debate" },
  { day: "Day 1", name: "Chanakya - Elite Executives" },
  { day: "Day 1", name: "Chitratmak - Pictionary" },
  { day: "Day 1", name: "Chucklesome - Mad Ads" },
  { day: "Day 1", name: "Codex Cronicals" },
  { day: "Day 1", name: "Art Beat - Pencil Sketching" },
  { day: "Day 1", name: "Hog A Thon" },
  { day: "Day 1", name: "BGMI: E sports" },
  { day: "Day 1", name: "Hum & Hunch - Guess the Song" },
  { day: "Day 1", name: "Danspiration - Group Dance" },
  { day: "Day 2", name: "STEP UP - Free Style Solo Dance" },
  { day: "Day 2", name: "Poetry Writing" },
  { day: "Day 2", name: "500 Mile - Start Up 500" },
  { day: "Day 2", name: "Gadyapatana Spardha" },
  { day: "Day 2", name: "Bon Appetit - Flameless Cooking" },
  { day: "Day 2", name: "Curio - General Quiz" },
  { day: "Day 2", name: "Bhagavatgita Vaachana Spardha" },
  { day: "Day 2", name: "Matrix Run" },
  { day: "Day 2", name: "Chitra Spardhe" },
  { day: "Day 2", name: "Treasure Hunt" },
  { day: "Day 2", name: "Thug of War" },
  { day: "Day 2", name: "Best Physique" },
  { day: "Day 2", name: "Vogue Alley - Fashion Show" }
];

function createCard(event) {
  const [title, subtitle] = event.name.split(" - ");
  return `
    <div class="card" data-day="${event.day}">
      <h2>${title}</h2>
      ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
      <div class="card-footer">
        <p>Join us for an exciting event!</p>
        <a href="#" class="learn-more">Learn More</a>
      </div>
    </div>
  `;
}

function displayEvents(filter = "all") {
  const container = document.getElementById("eventGrid");
  container.innerHTML = events
    .filter(e => filter === "all" || e.day === filter)
    .map(createCard)
    .join("");
}

function filterEvents() {
  const filter = document.getElementById("dayFilter").value;
  displayEvents(filter);
}

displayEvents();

function playIntro() {
  const overlay = document.getElementById('videoOverlay');
  const video = document.getElementById('introVideo');

  overlay.style.display = 'block';
  video.currentTime = 0;
  video.play();
  setTimeout(() => window.location.href = 'events.html', 2000);
}
