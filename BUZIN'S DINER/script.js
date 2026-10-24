(function() {
                      const container = document.getElementById('threejs-container-ANIMATION_11');
                      if (!container) return;

                      const width = container.clientWidth || 550;
                      const height = container.clientHeight || 400;

                      const scene = new THREE.Scene();
                      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
                      camera.position.set(0, 0.4, 4.8);

                      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
                      renderer.setSize(width, height);
                      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                      renderer.shadowMap.enabled = true;
                      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                      container.appendChild(renderer.domElement);

                      const ambientLight = new THREE.AmbientLight(0x28231d, 1.8);
                      scene.add(ambientLight);

                      const keyLight = new THREE.DirectionalLight(0xfff6e5, 3.2);
                      keyLight.position.set(4, 6, 5);
                      keyLight.castShadow = true;
                      scene.add(keyLight);

                      const goldRim = new THREE.PointLight(0xd4af37, 4.0, 10);
                      goldRim.position.set(-3.5, 2.5, -2.5);
                      scene.add(goldRim);

                      const backLight = new THREE.DirectionalLight(0xa37e2c, 2.0);
                      backLight.position.set(0, 4, -4);
                      scene.add(backLight);

                      const softWarmFill = new THREE.PointLight(0xcc6633, 1.4, 8);
                      softWarmFill.position.set(2, -2, 2.5);
                      scene.add(softWarmFill);

                      const bottleGroup = new THREE.Group();
                      scene.add(bottleGroup);
                      bottleGroup.position.set(0, -0.4, 0);

                      function createWineLabelTexture() {
                        const canvas = document.createElement('canvas');
                        canvas.width = 1024;
                        canvas.height = 1024;
                        const ctx = canvas.getContext('2d');

                        ctx.fillStyle = '#f5eedb';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        ctx.fillStyle = 'rgba(180, 150, 110, 0.08)';
                        for (let i = 0; i < 400; i++) {
                          const rx = Math.random() * canvas.width;
                          const ry = Math.random() * canvas.height;
                          ctx.fillRect(rx, ry, Math.random() * 4, Math.random() * 4);
                        }

                        ctx.strokeStyle = '#b89230';
                        ctx.lineWidth = 14;
                        ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

                        ctx.strokeStyle = '#1d1912';
                        ctx.lineWidth = 4;
                        ctx.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);

                        ctx.strokeStyle = '#b89230';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

                        ctx.fillStyle = '#b89230';
                        ctx.font = 'bold 36px serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('✦  GRAND CRU CLASSÉ  ✦', canvas.width / 2, 160);

                        ctx.fillStyle = '#141416';
                        ctx.font = 'bold italic 68px "Playfair Display", Georgia, serif';
                        ctx.fillText("DOMAINE DE BUZIN", canvas.width / 2, 260);

                        ctx.fillStyle = '#5c5344';
                        ctx.font = '30px sans-serif';
                        ctx.letterSpacing = '6px';
                        ctx.fillText('ROMANÉE-CONTI GRAND CRU', canvas.width / 2, 330);

                        ctx.strokeStyle = '#b89230';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(260, 370);
                        ctx.lineTo(764, 370);
                        ctx.stroke();

                        ctx.fillStyle = '#9e1b32';
                        ctx.font = 'bold 110px "Playfair Display", Georgia, serif';
                        ctx.fillText('1978', canvas.width / 2, 510);

                        ctx.fillStyle = '#3a342a';
                        ctx.font = 'italic 28px Georgia, serif';
                        ctx.fillText('Mis en bouteille au domaine', canvas.width / 2, 600);
                        ctx.fillText('Monopole • Mayfair Allocation Réserve', canvas.width / 2, 650);

                        ctx.font = 'bold 24px monospace';
                        ctx.fillStyle = '#b89230';
                        ctx.fillText('№  042 / 120 FLACONS', canvas.width / 2, 740);

                        ctx.font = '22px sans-serif';
                        ctx.fillStyle = '#6a6050';
                        ctx.fillText('750 ML  —  13.5% VOL  —  MAYFAIR CODEX', canvas.width / 2, 830);

                        ctx.beginPath();
                        ctx.arc(canvas.width / 2, 910, 36, 0, Math.PI * 2);
                        ctx.fillStyle = '#b89230';
                        ctx.fill();
                        ctx.fillStyle = '#f5eedb';
                        ctx.font = 'bold 20px serif';
                        ctx.fillText('BUZIN', canvas.width / 2, 917);

                        const tex = new THREE.CanvasTexture(canvas);
                        tex.anisotropy = 4;
                        return tex;
                      }

                      const labelTexture = createWineLabelTexture();

                      const deepGlassMaterial = new THREE.MeshPhongMaterial({
                        color: 0x09140c,
                        emissive: 0x030804,
                        specular: 0xccffdd,
                        shininess: 120,
                        reflectivity: 0.9,
                        transparent: true,
                        opacity: 0.94,
                        depthWrite: true,
                      });

                      const goldFoilCapsuleMaterial = new THREE.MeshPhongMaterial({
                        color: 0xd4af37,
                        emissive: 0x2b1e06,
                        specular: 0xfff6c7,
                        shininess: 100,
                      });

                      const labelMaterial = new THREE.MeshPhongMaterial({
                        map: labelTexture,
                        specular: 0x222222,
                        shininess: 15,
                      });

                      const goldTrimMaterial = new THREE.MeshPhongMaterial({
                        color: 0xe5c358,
                        emissive: 0x3d2a08,
                        specular: 0xffffff,
                        shininess: 110,
                      });

                      const bodyHeight = 1.6;
                      const bodyRadius = 0.52;
                      const bodyGeo = new THREE.CylinderGeometry(bodyRadius, bodyRadius, bodyHeight, 48);
                      const bodyMesh = new THREE.Mesh(bodyGeo, deepGlassMaterial);
                      bodyMesh.position.y = bodyHeight / 2;
                      bodyMesh.castShadow = true;
                      bottleGroup.add(bodyMesh);

                      const baseRingGeo = new THREE.TorusGeometry(bodyRadius - 0.05, 0.04, 16, 48);
                      const baseRing = new THREE.Mesh(baseRingGeo, deepGlassMaterial);
                      baseRing.rotation.x = Math.PI / 2;
                      baseRing.position.y = 0.02;
                      bottleGroup.add(baseRing);

                      const labelRadius = bodyRadius + 0.003;
                      const labelGeo = new THREE.CylinderGeometry(labelRadius, labelRadius, 0.95, 48, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
                      const labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
                      labelMesh.position.y = 0.76;
                      bottleGroup.add(labelMesh);

                      const shoulderGeo = new THREE.CylinderGeometry(0.24, bodyRadius, 0.55, 48);
                      const shoulderMesh = new THREE.Mesh(shoulderGeo, deepGlassMaterial);
                      shoulderMesh.position.y = bodyHeight + 0.55 / 2;
                      bottleGroup.add(shoulderMesh);

                      const neckRadius = 0.18;
                      const neckHeight = 0.95;
                      const neckGeo = new THREE.CylinderGeometry(neckRadius * 0.94, 0.24, neckHeight, 48);
                      const neckMesh = new THREE.Mesh(neckGeo, deepGlassMaterial);
                      neckMesh.position.y = bodyHeight + 0.55 + neckHeight / 2;
                      bottleGroup.add(neckMesh);

                      const capsuleHeight = 0.72;
                      const capsuleGeo = new THREE.CylinderGeometry(neckRadius * 0.97, neckRadius * 0.98, capsuleHeight, 48);
                      const capsuleMesh = new THREE.Mesh(capsuleGeo, goldFoilCapsuleMaterial);
                      capsuleMesh.position.y = bodyHeight + 0.55 + neckHeight - capsuleHeight / 2 + 0.02;
                      bottleGroup.add(capsuleMesh);

                      const collarGeo = new THREE.TorusGeometry(neckRadius * 1.05, 0.035, 16, 36);
                      const collarMesh = new THREE.Mesh(collarGeo, goldFoilCapsuleMaterial);
                      collarMesh.rotation.x = Math.PI / 2;
                      collarMesh.position.y = bodyHeight + 0.55 + neckHeight + 0.01;
                      bottleGroup.add(collarMesh);

                      const corkDiscGeo = new THREE.CylinderGeometry(neckRadius * 0.95, neckRadius * 0.95, 0.03, 32);
                      const corkDisc = new THREE.Mesh(corkDiscGeo, goldTrimMaterial);
                      corkDisc.position.y = bodyHeight + 0.55 + neckHeight + 0.03;
                      bottleGroup.add(corkDisc);

                      const plinthGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.12, 48);
                      const plinthMaterial = new THREE.MeshPhongMaterial({
                        color: 0x12141a,
                        emissive: 0x050608,
                        specular: 0x3e424f,
                        shininess: 70,
                      });
                      const plinth = new THREE.Mesh(plinthGeo, plinthMaterial);
                      plinth.position.y = -0.06;
                      plinth.receiveShadow = true;
                      bottleGroup.add(plinth);

                      const goldPlinthTrim = new THREE.Mesh(new THREE.TorusGeometry(1.24, 0.025, 16, 64), goldTrimMaterial);
                      goldPlinthTrim.rotation.x = Math.PI / 2;
                      goldPlinthTrim.position.y = 0.0;
                      bottleGroup.add(goldPlinthTrim);

                      const particleCount = 45;
                      const particleGeo = new THREE.BufferGeometry();
                      const particlePos = new Float32Array(particleCount * 3);
                      const particleData = [];

                      for (let i = 0; i < particleCount; i++) {
                        const theta = Math.random() * Math.PI * 2;
                        const rad = 0.7 + Math.random() * 1.3;
                        particlePos[i * 3] = Math.cos(theta) * rad;
                        particlePos[i * 3 + 1] = Math.random() * 3.2;
                        particlePos[i * 3 + 2] = Math.sin(theta) * rad;
                        particleData.push({
                          theta: theta,
                          rad: rad,
                          speed: 0.004 + Math.random() * 0.008,
                          yVel: 0.003 + Math.random() * 0.006,
                        });
                      }
                      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
                      const particleMaterial = new THREE.PointsMaterial({
                        color: 0xd4af37,
                        size: 0.035,
                        transparent: true,
                        opacity: 0.8,
                        blending: THREE.AdditiveBlending,
                      });
                      const particleSystem = new THREE.Points(particleGeo, particleMaterial);
                      bottleGroup.add(particleSystem);

                      let isDragging = false;
                      let previousPointerX = 0;
                      let previousPointerY = 0;
                      let rotationVelocityY = 0.012;
                      let targetTiltX = 0.08;

                      function onPointerDown(e) {
                        isDragging = true;
                        previousPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
                        previousPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
                        rotationVelocityY = 0;
                      }

                      function onPointerMove(e) {
                        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
                        const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

                        if (isDragging) {
                          const deltaX = currentX - previousPointerX;
                          const deltaY = currentY - previousPointerY;
                          bottleGroup.rotation.y += deltaX * 0.012;
                          bottleGroup.rotation.x = Math.max(-0.25, Math.min(0.35, bottleGroup.rotation.x + deltaY * 0.008));
                          rotationVelocityY = deltaX * 0.008;
                          previousPointerX = currentX;
                          previousPointerY = currentY;
                        } else {
                          const rect = container.getBoundingClientRect();
                          const nx = ((currentX - rect.left) / rect.width) * 2 - 1;
                          targetTiltX = 0.08 + nx * 0.12;
                        }
                      }

                      function onPointerUp() {
                        isDragging = false;
                      }

                      container.addEventListener('pointerdown', onPointerDown);
                      window.addEventListener('pointermove', onPointerMove);
                      window.addEventListener('pointerup', onPointerUp);

                      function onResize() {
                        const w = container.clientWidth || 550;
                        const h = container.clientHeight || 400;
                        camera.aspect = w / h;
                        camera.updateProjectionMatrix();
                        renderer.setSize(w, h);
                      }
                      window.addEventListener('resize', onResize);

                      const clock = new THREE.Clock();
                      function animate() {
                        requestAnimationFrame(animate);
                        const elapsed = clock.getElapsedTime();

                        if (!isDragging) {
                          rotationVelocityY *= 0.96;
                          const baseSpeed = 0.007;
                          bottleGroup.rotation.y += Math.max(rotationVelocityY, baseSpeed);
                          bottleGroup.rotation.x += (targetTiltX - bottleGroup.rotation.x) * 0.05;
                        }

                        bottleGroup.position.y = -0.4 + Math.sin(elapsed * 1.6) * 0.04;

                        const positions = particleGeo.attributes.position.array;
                        for (let i = 0; i < particleCount; i++) {
                          const p = particleData[i];
                          p.theta += p.speed;
                          positions[i * 3] = Math.cos(p.theta) * p.rad;
                          positions[i * 3 + 2] = Math.sin(p.theta) * p.rad;
                          positions[i * 3 + 1] += p.yVel;
                          if (positions[i * 3 + 1] > 3.2) {
                            positions[i * 3 + 1] = 0.05;
                          }
                        }
                        particleGeo.attributes.position.needsUpdate = true;
                        goldRim.intensity = 3.6 + Math.sin(elapsed * 2.2) * 0.8;

                        renderer.render(scene, camera);
                      }
                      animate();
                    })();

(function initSmoothCursor() {
      const cursorDot = document.getElementById('cursorDot');
      const cursorFollower = document.getElementById('cursorFollower');
      const cursorShape = document.getElementById('cursorShape');
      const supportsPointer = window.matchMedia('(pointer: fine)').matches;

      if (!cursorFollower || !supportsPointer) return;

      // Physics variables
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;
      let rotationAngle = 0;
      let targetRotation = 0;
      let currentAngleRad = 0;
      let isVisible = false;
      let isPressed = false;
      let isHovering = false;
      let currentScale = 1;
      let targetScale = 1;

      // Trailing Dots System (emanates from the rear base of the arrow)
      const TRAIL_COUNT = 8;
      const trailDots = [];
      const trailPositions = [];

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        const size = Math.max(3.5, 11 - i * 1.0);
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.opacity = '0';
        document.body.appendChild(dot);
        trailDots.push(dot);
        trailPositions.push({ x: mouseX, y: mouseY });
      }

      // Hide default OS cursor
      document.body.style.cursor = 'none';

      // Mouse Move Listener
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Position lead blue dot with instant responsiveness
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        if (!isVisible) {
          isVisible = true;
          cursorDot.classList.add('is-visible');
          cursorFollower.classList.add('is-visible');
        }

        // Check if hovering interactive element
        const target = e.target;
        const interactive = target && target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-path]");
        if (interactive) {
          if (!isHovering) {
            isHovering = true;
            cursorDot.classList.add('is-hovering');
            cursorFollower.classList.add('is-hovering');
          }
        } else {
          if (isHovering) {
            isHovering = false;
            cursorDot.classList.remove('is-hovering');
            cursorFollower.classList.remove('is-hovering');
          }
        }
      });

      window.addEventListener('mousedown', () => {
        isPressed = true;
        cursorFollower.classList.add('is-pressed');
      });

      window.addEventListener('mouseup', () => {
        isPressed = false;
        cursorFollower.classList.remove('is-pressed');
      });

      window.addEventListener('mouseenter', () => {
        isVisible = true;
        cursorDot.classList.add('is-visible');
        cursorFollower.classList.add('is-visible');
        document.body.style.cursor = 'none';
      });

      window.addEventListener('mouseleave', () => {
        isVisible = false;
        cursorDot.classList.remove('is-visible');
        cursorFollower.classList.remove('is-visible');
        trailDots.forEach(dot => dot.style.opacity = '0');
        document.body.style.cursor = 'auto';
      });

      // Smooth Animation Loop (60-120fps)
      function render() {
        // Spring easing towards mouse
        const ease = 0.20;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        // Dynamic scale
        if (isPressed) {
          targetScale = 0.8;
        } else if (isHovering) {
          targetScale = 1.3;
        } else {
          targetScale = 1.0;
        }
        currentScale += (targetScale - currentScale) * 0.22;

        // Vector pointing directly from follower to lead blue dot
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        const dist = Math.hypot(dx, dy);

        if (dist > 1.2) {
          currentAngleRad = Math.atan2(dy, dx);
          targetRotation = currentAngleRad * (180 / Math.PI) + 90;
        }

        // Smooth rotation angle interpolation
        let angleDiff = targetRotation - rotationAngle;
        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;
        rotationAngle += angleDiff * 0.22;

        // Minute gap (in pixels) between the apex tip of the arrow and the blue dot
        const MINUTE_GAP = 14;
        const currentRad = (rotationAngle - 90) * (Math.PI / 180);
        // Position the tip offset backwards along the angle to guarantee the clean gap
        const tipX = cursorX - Math.cos(currentRad) * MINUTE_GAP;
        const tipY = cursorY - Math.sin(currentRad) * MINUTE_GAP;

        // Place follower precisely at tip coordinates & apply rotation
        cursorFollower.style.transform = `translate3d(${tipX}px, ${tipY}px, 0)`;
        cursorShape.style.transform = `rotate(${rotationAngle}deg) scale(${currentScale})`;

        // Trailing particles flow out from the rear base of the arrow
        const ARROW_BASE_LENGTH = 36 * currentScale;
        let prevTrailX = tipX - Math.cos(currentRad) * ARROW_BASE_LENGTH;
        let prevTrailY = tipY - Math.sin(currentRad) * ARROW_BASE_LENGTH;

        for (let i = 0; i < TRAIL_COUNT; i++) {
          const pos = trailPositions[i];
          pos.x += (prevTrailX - pos.x) * 0.40;
          pos.y += (prevTrailY - pos.y) * 0.40;

          const dot = trailDots[i];
          if (isVisible && !isHovering) {
            dot.style.opacity = ((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.6;
            dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
          } else {
            dot.style.opacity = '0';
          }

          prevTrailX = pos.x;
          prevTrailY = pos.y;
        }

        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    })();

    const userLogoPhoto = document.getElementById('userLogoPhoto');
    const avatarFallback = document.getElementById('avatarFallback');

    userLogoPhoto.addEventListener('error', () => {
      if (userLogoPhoto.src.endsWith('profile.jpg')) {
        userLogoPhoto.src = 'profile.png';
        return;
      }

      userLogoPhoto.classList.add('is-hidden');
      avatarFallback.classList.add('is-visible');
    });
