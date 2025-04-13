function playTunnelThenRedirect() {
    document.querySelector('.page-wrapper').style.display = 'none';
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 0;
  
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('tunnel-canvas'), antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.domElement.style.opacity = '1';
    renderer.domElement.style.transition = 'opacity 0.5s';
  
    const uniforms = {
      uSmoothness: { value: 1.0 },
      uGridDensity: { value: 26.0 },
      uNoiseScale: { value: 10.0 },
      uNoiseSpeed: { value: 0.5 },
      uNoiseStrength: { value: 0.15 },
      uEnableDisplacement: { value: true },
      uTime: { value: 0.0 },
      uWireColor: { value: new THREE.Color(0x00bfff) },
      uBaseColor: { value: new THREE.Color(0x000005) },
    };
  
    const wireframeMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uSmoothness, uGridDensity, uNoiseScale, uNoiseSpeed, uNoiseStrength, uTime;
        uniform bool uEnableDisplacement;
        uniform vec3 uWireColor, uBaseColor;
        varying vec2 vUv;
  
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
  
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
  
        void main() {
          vec2 grid = abs(fract(vUv * uGridDensity - 0.5) - 0.5);
          vec2 gridWidth = fwidth(vUv * uGridDensity);
          float line = 1.0 - min(smoothstep(0.0, gridWidth.x * uSmoothness, grid.x), smoothstep(0.0, gridWidth.y * uSmoothness, grid.y));
  
          float noiseValue = uEnableDisplacement ? noise(vUv * uNoiseScale + uTime * uNoiseSpeed) * uNoiseStrength : 0.0;
  
          float pulse = 0.5 + 0.5 * sin(uTime * 3.0);
          float intensity = line * pulse;
  
          vec3 neon = mix(uBaseColor, uWireColor, intensity);
          neon += vec3(0.1, 0.3, 0.6) * noiseValue;
          neon = pow(neon, vec3(1.2));
  
          gl_FragColor = vec4(neon, 1.0);
        }
      `,
      side: THREE.BackSide,
    });
  
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(3, 2, -20), new THREE.Vector3(-3, -2, -30),
      new THREE.Vector3(0, 0, -40), new THREE.Vector3(2, 1, -50),
      new THREE.Vector3(-2, -1, -60), new THREE.Vector3(0, 0, -70)
    ]);
  
    const geometry = new THREE.TubeGeometry(path, 300, 2, 32, false);
    const tube = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(tube);
  
    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  
    let percentage = { value: 0 };
    gsap.to(percentage, {
      value: 0.3,
      duration: 3,
      ease: "linear",
      onUpdate: () => {
        const offset = 0.7;
        const t = offset + percentage.value;
        if (t >= 1.0) return;
        const p1 = path.getPointAt(t);
        const p2 = path.getPointAt(Math.min(t + 0.01, 1.0));
        camera.position.set(p1.x + mouse.x * 0.3, p1.y + mouse.y * 0.3, p1.z);
        camera.lookAt(p2);
      },
      onComplete: () => {
        renderer.dispose();
        window.location.href = "events.html";
      }
    });
  
    function render() {
      uniforms.uTime.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  
    render();
  }
  window.playTunnelThenRedirect = playTunnelThenRedirect;
  