const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('stars-canvas'), alpha: true });

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

    const interval = setInterval(() => {
      scale += 0.2;
      video.style.transform = `translate(-50%, -50%) scale(${scale})`;

      if (scale >= 2.5) {
        clearInterval(interval);
      }
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
  const formData = new FormData();
  formData.append('firstName', firstName.value.trim());
  formData.append('lastName', lastName.value.trim());
  formData.append('email', email.value.trim());
  formData.append('phone', phone.value.trim());
  formData.append('message', message.value.trim());

  fetch("https://script.google.com/macros/s/AKfycbzydH0fdsXZHvtracOpHijLz46032j0sWzyHT6jwjSeOrg52Qan8FXHdH6Da8-yVjA0/exec", {
    method: "POST",
    body: formData
  })
  .then(res => {
    if (res.ok) {
      alert("Thank you for your message! We will get back to you soon.");
      document.getElementById("contactForm").reset();
    } else {
      alert("Error submitting. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error!", error.message);
    alert("There was an error sending your message. Please try again later.");
  });
}
return false;
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
  { id: 1, day: "Day 1", name: "Bulls & Bears - Mockstock" },
  { id: 2, day: "Day 1", name: "Nautanki - Mime" },
  { id: 3, day: "Day 1", name: "Marketing Event - Big Pitcher" },
  { id: 4, day: "Day 1", name: "Battle of Words - Debate" },
  { id: 5, day: "Day 1", name: "Maathu Manthana - Kannada Debate" },
  { id: 6, day: "Day 1", name: "Chanakya - Elite Executives" },
  { id: 7, day: "Day 1", name: "Chitratmak - Pictionary" },
  { id: 8, day: "Day 1", name: "Chucklesome - Mad Ads" },
  { id: 9, day: "Day 1", name: "Codex Cronicals" },
  { id: 10, day: "Day 1", name: "Art Beat - Pencil Sketching" },
  { id: 11, day: "Day 1", name: "Hog A Thon" },
  { id: 12, day: "Day 1", name: "BGMI: E sports" },
  { id: 13, day: "Day 1", name: "Hum & Hunch - Guess the Song" },
  { id: 14, day: "Day 1", name: "Danspiration - Group Dance" },
  { id: 15, day: "Day 2", name: "STEP UP - Free Style Solo Dance" },
  { id: 16, day: "Day 2", name: "Poetry Writing" },
  { id: 17, day: "Day 2", name: "500 Mile - Start Up 500" },
  { id: 18, day: "Day 2", name: "Gadyapatana Spardha" },
  { id: 19, day: "Day 2", name: "Bon Appetit - Flameless Cooking" },
  { id: 20, day: "Day 2", name: "Curio - General Quiz" },
  { id: 21, day: "Day 2", name: "Bhagavatgita Vaachana Spardha" },
  { id: 22, day: "Day 2", name: "Matrix Run" },
  { id: 23, day: "Day 2", name: "Chitra Spardhe" },
  { id: 24, day: "Day 2", name: "Treasure Hunt" },
  { id: 25, day: "Day 2", name: "Thug of War" },
  { id: 26, day: "Day 2", name: "Best Physique" },
  { id: 27, day: "Day 2", name: "Vogue Alley - Fashion Show" }
];

function createCard(event) {
  const [title, subtitle] = event.name.split(" - ");
  return `
    <div class="card" data-day="${event.day}">
      <h2>${title}</h2>
      ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
      <div class="card-footer">
        <p>Join us for an exciting event!</p>
        <a href="eventDetail.html?id=${event.id}" class="learn-more">Learn More</a>

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

