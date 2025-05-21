// script.js

// Set up Three.js star background
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
for (let i = 0; i < 300; i++) createStar();
function animate() {
  requestAnimationFrame(animate);
  for (const star of stars) {
    star.position.y -= 0.02;
    star.position.x -= 0.01;
    if (star.position.y < -5 || star.position.x < -15) {
      star.position.y = Math.random() * 10 + 5;
      star.position.x = Math.random() * 20 - 10;
      star.position.z = Math.random() * 20 - 10;
    }
  }
  renderer.render(scene, camera);
}
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
      if (scale >= 2.5) clearInterval(interval);
    }, 1000);
  }
  if (window.location.pathname.endsWith('events.html')) {
    const eventGrid = document.getElementById("eventGrid");
    if (eventGrid) displayEvents();
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
    .catch(() => {
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
function createCard(event) {
  return `
    <div class="card" data-day="${event.day}">
      <h2>${event.title}</h2>
      ${event.subtitle ? `<div class="subtitle">${event.subtitle}</div>` : ""}
      <div class="card-footer">
        <p>Join us for an exciting event!</p>
        <a href="eventDetail.html?id=${event.eventId}" class="learn-more">Learn More</a><br><br>
        <button onclick="openEditModal('${event._id}', \`${event.title.replace(/`/g, "\\`")}\`, \`${(event.subtitle || '').replace(/`/g, "\\`")}\`)">Edit</button>
        <button onclick="deleteEvent('${event._id}')">Delete</button>
      </div>
    </div>
  `;
}
function displayEvents(filter = "all") {
  fetch("http://localhost:3000/api/events")
    .then(res => {
      if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
      return res.json();
    })
    .then(events => {
      const container = document.getElementById("eventGrid");
      if (!container) return;
      const filteredEvents = events.filter(e => filter === "all" || e.day === filter);
      if (filteredEvents.length === 0) {
        container.innerHTML = '<p>No events found for this selection.</p>';
        return;
      }
      container.innerHTML = filteredEvents.map(createCard).join("");
    })
    .catch(() => {
      const container = document.getElementById("eventGrid") || document.querySelector(".cards-container");
      if (container) container.innerHTML = '<p>Sorry, failed to load events. Please try again later.</p>';
    });
}
function filterEvents() {
  const filter = document.getElementById("dayFilter").value;
  displayEvents(filter);
}
