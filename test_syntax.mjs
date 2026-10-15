
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

    window.THREE = THREE;

        // --- Marvel Studios 'Iron Man 2' Mark V Suitcase Mechanical Audio Engine ---
    const AudioEngine = window.AudioEngine = {
      ctx: null,
      noiseBuffer: null,
      metalRingBuffer: null,
      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
            const bufferSize = this.ctx.sampleRate * 2.0;
            this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = this.noiseBuffer.getChannelData(0);
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
              const white = Math.random() * 2 - 1;
              b0 = 0.99886 * b0 + white * 0.0555179;
              b1 = 0.99332 * b1 + white * 0.0750759;
              b2 = 0.96900 * b2 + white * 0.1538520;
              b3 = 0.86650 * b3 + white * 0.3104856;
              b4 = 0.55000 * b4 + white * 0.5329522;
              b5 = -0.7616 * b5 - white * 0.0168980;
              data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
              b6 = white * 0.115926;
            }
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      },
      // 1. Rapid Multi-Plate Stepper Ratchet & Track Clicker (钢铁侠2标志性密集微型鳞片齿轮咔哒声)
      playRatchetCascade(clicks = 8, intervalMs = 28) {
        this.init();
        if (!this.ctx) return;
        for (let i = 0; i < clicks; i++) {
          setTimeout(() => {
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            // High frequency micro-tooth snap
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const freq = 1600 + Math.random() * 800 + i * 90;
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.035);

            // Metallic tick impulse
            if (this.noiseBuffer) {
              const noise = this.ctx.createBufferSource();
              noise.buffer = this.noiseBuffer;
              const filter = this.ctx.createBiquadFilter();
              filter.type = 'highpass';
              filter.frequency.setValueAtTime(2800, now);
              const nGain = this.ctx.createGain();
              nGain.gain.setValueAtTime(0.06, now);
              nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
              noise.connect(filter);
              filter.connect(nGain);
              nGain.connect(this.ctx.destination);
              noise.start(now);
              noise.stop(now + 0.025);
            }
          }, i * intervalMs);
        }
      },
      // 2. High-Pressure Pneumatic Vent & CO2 Expulsion (手提箱初始解锁爆鸣泄压)
      playPneumaticVent() {
        this.init();
        if (!this.ctx || !this.noiseBuffer) return;
        const now = this.ctx.currentTime;
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3600, now);
        filter.frequency.exponentialRampToValueAtTime(520, now + 0.42);
        filter.Q.value = 5.0;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
        noise.stop(now + 0.42);

        // Heavy bottom hydraulic kick
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(160, now);
        sub.frequency.exponentialRampToValueAtTime(32, now + 0.22);
        subGain.gain.setValueAtTime(0.48, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        sub.connect(subGain);
        subGain.connect(this.ctx.destination);
        sub.start(now);
        sub.stop(now + 0.22);

        // Accompanied by micro ratchet cascade
        this.playRatchetCascade(6, 25);
      },
      // 3. Mark V Whining High-Torque Servo Motor (高亢工业伺服与拉线电机啸叫)
      playServoActuator(pitchFactor = 1.0) {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const servoGain = this.ctx.createGain();
        
        osc1.type = 'sawtooth';
        osc2.type = 'square';
        
        const baseFreq = 340 * pitchFactor;
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, now + 0.16);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.42);
        
        osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 3.6, now + 0.18);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.42);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
        filter.frequency.exponentialRampToValueAtTime(800, now + 0.42);
        filter.Q.value = 3.2;

        servoGain.gain.setValueAtTime(0.12, now);
        servoGain.gain.linearRampToValueAtTime(0.20, now + 0.14);
        servoGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(servoGain);
        servoGain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.42);
        osc2.stop(now + 0.42);

        this.playRatchetCascade(4, 35);
      },
      // 4. Hydraulic Slide & Metallic Track Glide (液压套筒与机械导轨拉伸音)
      playHydraulicSlide() {
        this.init();
        if (!this.ctx || !this.noiseBuffer) return;
        const now = this.ctx.currentTime;
        
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.linearRampToValueAtTime(1850, now + 0.28);
        filter.frequency.linearRampToValueAtTime(620, now + 0.55);
        filter.Q.value = 6.0;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
        noise.stop(now + 0.55);

        this.playRatchetCascade(5, 30);
      },
      // 5. Heavy Titanium Clank & Multi-Latch Clamp Slam (手提箱完全展开/复原时的连续重压咬合与金属回鸣)
      playArmorLockingClang() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        // 1. Primary Kinetic Slam (重型合金撞击低音炮)
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(220, now);
        sub.frequency.exponentialRampToValueAtTime(32, now + 0.32);
        subGain.gain.setValueAtTime(0.55, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        sub.connect(subGain);
        subGain.connect(this.ctx.destination);
        sub.start(now);
        sub.stop(now + 0.32);

        // 2. Twin High Mechanical Locking Snaps (前后重叠的双重高硬度卡死咔嗒声)
        [0, 0.045].forEach((delay, idx) => {
          const snapTime = now + delay;
          const snap = this.ctx.createOscillator();
          const snapGain = this.ctx.createGain();
          snap.type = 'sine';
          snap.frequency.setValueAtTime(2100 - idx * 300, snapTime);
          snap.frequency.exponentialRampToValueAtTime(210, snapTime + 0.08);
          snapGain.gain.setValueAtTime(0.32, snapTime);
          snapGain.gain.exponentialRampToValueAtTime(0.001, snapTime + 0.08);
          snap.connect(snapGain);
          snapGain.connect(this.ctx.destination);
          snap.start(snapTime);
          snap.stop(snapTime + 0.08);
        });

        // 3. Authentic Hollywood Titanium Ring Resonance (电影原声级别的金属共振泛音)
        [920, 1480, 2650].forEach((freq, idx) => {
          const ring = this.ctx.createOscillator();
          const ringGain = this.ctx.createGain();
          ring.type = 'sine';
          ring.frequency.setValueAtTime(freq, now);
          ring.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.45);
          ringGain.gain.setValueAtTime(0.11 / (idx + 1), now);
          ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          ring.connect(ringGain);
          ringGain.connect(this.ctx.destination);
          ring.start(now);
          ring.stop(now + 0.45);
        });

        // 4. Quick secondary settling click
        setTimeout(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const click = this.ctx.createOscillator();
          const cGain = this.ctx.createGain();
          click.type = 'sine';
          click.frequency.setValueAtTime(1400, t);
          click.frequency.exponentialRampToValueAtTime(180, t + 0.05);
          cGain.gain.setValueAtTime(0.20, t);
          cGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
          click.connect(cGain);
          cGain.connect(this.ctx.destination);
          click.start(t);
          click.stop(t + 0.05);
        }, 110);
      },
      // 6. Arc Reactor Nanotech Hum / Power Charge (反应堆能量场谐波脉冲)
      playArcReactorPower() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.6);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      },
      // 7. Repulsor Weapon High-Pitch Charge & Capacitor Whine (掌心炮/胸口反应堆充能啸叫)
      playRepulsorCharge() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(2900, now + 0.85);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.75);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.95);
      },
      // 8. Repulsor Blast Plasma Pulse Explosion (掌心炮等离子脉冲爆发音)
      playRepulsorBlast() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Sub-bass thump
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(260, now);
        sub.frequency.exponentialRampToValueAtTime(28, now + 0.45);
        subGain.gain.setValueAtTime(0.65, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        sub.connect(subGain);
        subGain.connect(this.ctx.destination);
        sub.start(now);
        sub.stop(now + 0.45);

        // High frequency plasma discharge hiss
        if (this.noiseBuffer) {
          const noise = this.ctx.createBufferSource();
          noise.buffer = this.noiseBuffer;
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(4500, now);
          filter.frequency.exponentialRampToValueAtTime(300, now + 0.6);
          filter.Q.value = 3.5;
          const nGain = this.ctx.createGain();
          nGain.gain.setValueAtTime(0.35, now);
          nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          noise.connect(filter);
          filter.connect(nGain);
          nGain.connect(this.ctx.destination);
          noise.start(now);
          noise.stop(now + 0.6);
        }
      },
      // 9. Heavy Titanium Footstep / Landing Impact (战甲踏步与铁拳砸地声)
      playFootstepClank() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);

        this.playRatchetCascade(3, 15);
      }
    };

    // --- Scene Setup ---
    const canvas = document.getElementById('webgl-canvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020409, 0.04);

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 80);
    camera.position.set(0, 1.1, 3.2);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.maxPolarAngle = Math.PI / 2 + 0.08;
    controls.minDistance = 0.7;
    controls.maxDistance = 7.5;
    controls.target.set(0, 0.95, 0);

    // --- Studio Cinematic Lighting ---
    const frontLight = new THREE.DirectionalLight(0xffffff, 3.2);
    frontLight.position.set(0, 3, 5);
    scene.add(frontLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.5);
    topLight.position.set(2, 6, 4);
    scene.add(topLight);

    const cyanRim = new THREE.DirectionalLight(0x00e1ff, 5.5);
    cyanRim.position.set(-5, 3, -3);
    scene.add(cyanRim);

    const amberRim = new THREE.DirectionalLight(0xff9900, 3.8);
    amberRim.position.set(5, 1.5, -3);
    scene.add(amberRim);

    const bottomFill = new THREE.DirectionalLight(0x00d2ff, 2.8);
    bottomFill.position.set(0, -2, 4);
    scene.add(bottomFill);

    const ambient = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambient);

    // Arc reactor PointLight
    const reactorLight = new THREE.PointLight(0x00f0ff, 5.0, 4.0);
    reactorLight.position.set(0, 1.25, 0.35);
    scene.add(reactorLight);

    // Dark ground disc
    const groundGeo = new THREE.CircleGeometry(3.6, 64);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x010307,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.01;
    scene.add(groundMesh);

    // --- Holographic Circular Calibration Grid ---
    const holoRingGeo = new THREE.RingGeometry(1.2, 1.23, 64);
    const holoRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const holoRing1 = new THREE.Mesh(holoRingGeo, holoRingMat);
    holoRing1.rotation.x = -Math.PI / 2;
    holoRing1.position.y = 0.01;
    scene.add(holoRing1);

    const holoOuterGeo = new THREE.RingGeometry(2.4, 2.42, 64);
    const holoOuterMat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const holoRing2 = new THREE.Mesh(holoOuterGeo, holoOuterMat);
    holoRing2.rotation.x = -Math.PI / 2;
    holoRing2.position.y = 0.01;
    scene.add(holoRing2);

    const holoGrid = new THREE.PolarGridHelper(2.5, 16, 8, 64, 0x00f0ff, 0x003355);
    holoGrid.position.y = 0.005;
    holoGrid.material.transparent = true;
    holoGrid.material.opacity = 0.28;
    scene.add(holoGrid);


    // Floating cinematic particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArr[i] = (Math.random() - 0.5) * 5;
      posArr[i + 1] = Math.random() * 3.0;
      posArr[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00e1ff,
      size: 0.02,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Visual Mechanical Linkages: Hydraulic Struts & Energy Tethers ---
    let strutPistonGroup = new THREE.Group();
    scene.add(strutPistonGroup);
    let strutMeshes = [];
    let showStruts = true;

    // Tether laser lines
    let tetherLines = null;
    let tetherPositions = null;
    let showTethers = true;

    function initMechanicalLinkageVisuals(partCount) {
      // 1. Clear old struts
      while (strutPistonGroup.children.length > 0) {
        strutPistonGroup.remove(strutPistonGroup.children[0]);
      }
      strutMeshes = [];

      // Create metallic cylinder geometry along Y axis for mechanical linkages
      const strutCylinderGeo = new THREE.CylinderGeometry(0.0032, 0.0032, 1, 8);
      strutCylinderGeo.translate(0, 0.5, 0);

      const strutMat = new THREE.MeshStandardMaterial({
        color: 0xc8d6e5,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0x002b3d,
        emissiveIntensity: 0.4
      });

      for (let i = 0; i < partCount; i++) {
        const mesh = new THREE.Mesh(strutCylinderGeo, strutMat);
        mesh.visible = false;
        strutPistonGroup.add(mesh);
        strutMeshes.push(mesh);
      }

      // 2. Tether laser lines
      if (tetherLines) scene.remove(tetherLines);
      tetherPositions = new Float32Array(partCount * 6);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(tetherPositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      tetherLines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(tetherLines);
    }

    // --- State Variables ---
    let currentModel = null;
    let armorParts = [];
      window.armorParts = armorParts;
      window.currentModel = currentModel;
    let deconstructProgress = 0.0;
    let isPlaying = false;
    let playDirection = 1; // 1: deconstructing, -1: reassembling
    let isLooping = true;
    let playSpeed = 1.0;

    const loaderElem = document.getElementById('loader');
    const dockSlider = document.getElementById('dock-slider');
    const dockStatusNum = document.getElementById('dock-status-num');
    const stagePill = document.getElementById('stage-pill');
    const stageText = document.getElementById('stage-text');
    const btnTogglePlay = document.getElementById('btn-toggle-play');
    const playIcon = document.getElementById('play-icon');
    const playText = document.getElementById('play-text');
    const btnStrut = document.getElementById('btn-strut');
    const btnTether = document.getElementById('btn-tether');
    const btnLoop = document.getElementById('btn-loop');
    const btnSpeed = document.getElementById('btn-speed');
    const btnReset = document.getElementById('btn-reset');
    const minimalDock = document.getElementById('minimal-dock');
    const stepElems = [
      document.getElementById('step-0'),
      document.getElementById('step-1'),
      document.getElementById('step-2'),
      document.getElementById('step-3')
    ];

    function fitCameraToObject(cam, object, ctrl, offset = 1.32) {
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = cam.fov * (Math.PI / 180);
      let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * offset;

      cam.position.set(center.x, center.y + size.y * 0.05, center.z + cameraDistance);
      cam.lookAt(center);

      if (ctrl) {
        ctrl.target.copy(center);
        ctrl.maxDistance = cameraDistance * 2.5;
        ctrl.minDistance = cameraDistance * 0.3;
        ctrl.update();
      }
    }

    // --- Setup Mark 85 Kinematic Engine ---
    
    // --- Dual-State System: Action Mode vs Disassembly Mode ---
    let currentAppMode = window.currentAppMode = 'action'; // 'action' | 'disassemble'
    let animatedModel = null;
    let animMixer = null;
    let animClips = [];
    let currentAnimAction = null;
    let activeActionName = 'idle';

    const btnModeAction = document.getElementById('btn-mode-action');
    const btnModeDisassemble = document.getElementById('btn-mode-disassemble');
    const actionDock = document.getElementById('action-dock');
    const stagePillElem = document.getElementById('stage-pill');
    const sequenceTrackerElem = document.querySelector('.sequence-tracker');
    const btnActIdle = document.getElementById('btn-act-idle');
    const btnActToSuit = document.getElementById('btn-act-tosuit');
    const btnActRepulsor = document.getElementById('btn-act-repulsor');
    const btnActLanding = document.getElementById('btn-act-landing');
    const actionButtons = [btnActIdle, btnActToSuit, btnActRepulsor, btnActLanding];

    function setAppMode(mode) {
      currentAppMode = mode;
      AudioEngine.init();

      if (mode === 'action') {
        btnModeAction.classList.add('active');
        btnModeDisassemble.classList.remove('active');
        actionDock.style.display = 'flex';
        minimalDock.style.display = 'none';
        stagePillElem.style.display = 'none';
        sequenceTrackerElem.style.display = 'none';

        // Show animated model, hide exploded model
        if (animatedModel) animatedModel.visible = true;
        if (currentModel) currentModel.visible = false;
        if (strutPistonGroup) strutPistonGroup.visible = false;
        if (tetherLines) tetherLines.visible = false;

        playActionAnimation(activeActionName);
        AudioEngine.playServoActuator(1.1);
        AudioEngine.playRatchetCascade(4, 20);
      } else {
        btnModeAction.classList.remove('active');
        btnModeDisassemble.classList.add('active');
        actionDock.style.display = 'none';
        minimalDock.style.display = 'flex';
        stagePillElem.style.display = 'flex';
        sequenceTrackerElem.style.display = 'flex';

        // Show exploded model, hide animated model
        if (animatedModel) animatedModel.visible = false;
        if (currentModel) currentModel.visible = true;
        if (strutPistonGroup) strutPistonGroup.visible = showStruts;
        if (tetherLines) tetherLines.visible = showTethers;

        applyDeconstructFactor(deconstructProgress, clock.getElapsedTime());
        updateUI(deconstructProgress);
        AudioEngine.playArmorLockingClang();
      }
    }

    btnModeAction.addEventListener('click', () => setAppMode('action'));
    btnModeDisassemble.addEventListener('click', () => setAppMode('disassemble'));

    // Play Action with Smooth Crossfade
    function playActionAnimation(name) {
      if (!animMixer || !animClips || animClips.length === 0) return;
      activeActionName = name;
      actionButtons.forEach(b => b.classList.remove('active'));

      let targetClip = null;
      let loopMode = THREE.LoopRepeat;

      if (name === 'idle') {
        btnActIdle.classList.add('active');
        targetClip = animClips.find(a => a.name === 'HighTower_Tomato_STG01_Male_Idle') || animClips[1];
      } else if (name === 'tosuit') {
        btnActToSuit.classList.add('active');
        targetClip = animClips.find(a => a.name.includes('ToSuit')) || animClips[0];
        loopMode = THREE.LoopOnce;
        AudioEngine.playPneumaticVent();
        setTimeout(() => AudioEngine.playServoActuator(1.2), 300);
        setTimeout(() => AudioEngine.playArmorLockingClang(), 1800);
      } else if (name === 'repulsor') {
        btnActRepulsor.classList.add('active');
        targetClip = animClips.find(a => a.name.includes('Idle.001')) || animClips[2];
        // Sound & Light Burst
        AudioEngine.playRepulsorCharge();
        setTimeout(() => {
          AudioEngine.playRepulsorBlast();
          reactorLight.intensity = 18.0;
          setTimeout(() => reactorLight.intensity = 5.0, 450);
        }, 750);
      } else if (name === 'landing') {
        btnActLanding.classList.add('active');
        targetClip = animClips.find(a => a.name.includes('Idle.002')) || animClips[7];
        AudioEngine.playFootstepClank();
        setTimeout(() => AudioEngine.playArmorLockingClang(), 400);
      }

      if (targetClip) {
        const nextAction = animMixer.clipAction(targetClip);
        nextAction.setLoop(loopMode);
        nextAction.clampWhenFinished = true;
        nextAction.reset();

        if (currentAnimAction && currentAnimAction !== nextAction) {
          currentAnimAction.fadeOut(0.35);
          nextAction.fadeIn(0.35);
        }
        nextAction.play();
        currentAnimAction = nextAction;

        // Auto return to idle if LoopOnce
        if (loopMode === THREE.LoopOnce) {
          const onFinished = () => {
            animMixer.removeEventListener('finished', onFinished);
            playActionAnimation('idle');
          };
          animMixer.addEventListener('finished', onFinished);
        }
      }
    }

    btnActIdle.addEventListener('click', () => playActionAnimation('idle'));
    btnActToSuit.addEventListener('click', () => playActionAnimation('tosuit'));
    btnActRepulsor.addEventListener('click', () => playActionAnimation('repulsor'));
    btnActLanding.addEventListener('click', () => playActionAnimation('landing'));

    // Load Animated Model in Background
    function loadAnimatedSkeletalModel() {
      loader.load('models/mark85_animated.glb', (gltf) => {
        animatedModel = gltf.scene;
        window.animatedModel = animatedModel;
        animClips = gltf.animations;

        // Enhance metallic shader
        animatedModel.traverse(c => {
          if (c.isMesh && c.material) {
            c.material.metalness = 0.92;
            c.material.roughness = 0.18;
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });

        // Normalize scale and ground position matching canonical 1.85m height
        const box = new THREE.Box3().setFromObject(animatedModel);
        const size = box.getSize(new THREE.Vector3());
        const scale = 1.85 / (size.y || 1);
        animatedModel.scale.setScalar(scale);
        animatedModel.updateMatrixWorld(true);

        const box2 = new THREE.Box3().setFromObject(animatedModel);
        const center2 = box2.getCenter(new THREE.Vector3());
        animatedModel.position.x -= center2.x;
        animatedModel.position.z -= center2.z;
        animatedModel.position.y -= box2.min.y;
        animatedModel.updateMatrixWorld(true);

        animMixer = new THREE.AnimationMixer(animatedModel);
        window.animMixer = animMixer;

        scene.add(animatedModel);

        // Default to Action Mode upon load!
        setAppMode('action');
      });
    }

    function setupMark85Engine(gltf) {
      if (currentModel) scene.remove(currentModel);

      currentModel = gltf.scene;
      armorParts = [];
      window.armorParts = armorParts;
      window.currentModel = currentModel;

      // 1. Normalize scale to canonical 1.85m height
      const rawBox = new THREE.Box3().setFromObject(currentModel);
      const rawSize = new THREE.Vector3();
      rawBox.getSize(rawSize);
      const targetHeight = 1.85;
      const scaleFactor = targetHeight / (rawSize.y || 1);
      currentModel.scale.setScalar(scaleFactor);
      currentModel.updateMatrixWorld(true);

      // 2. Center horizontally and ground feet
      const scaledBox = new THREE.Box3().setFromObject(currentModel);
      const scaledCenter = new THREE.Vector3();
      scaledBox.getCenter(scaledCenter);
      currentModel.position.x -= scaledCenter.x;
      currentModel.position.z -= scaledCenter.z;
      currentModel.position.y -= scaledBox.min.y;
      currentModel.updateMatrixWorld(true);

      // 3. Mark 85 faces front
      currentModel.rotation.y = 0;
      currentModel.updateMatrixWorld(true);

      // 4. Enhance Materials (High-spec metallic finishes)
      currentModel.traverse((child) => {
        if (child.isMesh && child.material && child.visible) {
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;
          if (child.material.metalness !== undefined) {
            child.material.metalness = Math.max(child.material.metalness, 0.86);
            child.material.roughness = Math.min(child.material.roughness, 0.24);
          }
        }
      });

      scene.add(currentModel);

      const box = new THREE.Box3().setFromObject(currentModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      fitCameraToObject(camera, currentModel, controls);

      // 5. Build High-Fidelity Kinematic Separation Hierarchy
      let meshIdx = 0;
      currentModel.traverse((child) => {
        if (child.isMesh && child.visible) {
          child.castShadow = true;
          child.receiveShadow = true;

          const meshBox = new THREE.Box3().setFromObject(child);
          const meshCenter = new THREE.Vector3();
          meshBox.getCenter(meshCenter);

          const origWorldPos = new THREE.Vector3();
          child.getWorldPosition(origWorldPos);

          const relY = (meshCenter.y - box.min.y) / size.y;
          const relX = (meshCenter.x - center.x) / (size.x * 0.5 || 1);
          const relZ = (meshCenter.z - center.z) / (size.z * 0.5 || 1);
          const signX = (meshCenter.x - center.x) >= 0 ? 1 : -1;
          const signZ = (meshCenter.z - center.z) >= 0 ? 1 : -1;

          // Dedicated Cinematic Kinematic Classification for Mark 85
          // Preserves spine chassis anchor at origin while symmetrically expanding outer shell
          let subsystem = 'torso';
          let isCore = false;
          let unlatchVec = new THREE.Vector3();
          let hingeAxisRot = new THREE.Vector3();
          let railSlideVec = new THREE.Vector3();
          let phaseStagger = 0.0;

          if (meshIdx === 3 || meshIdx === 4 || meshIdx === 5 || meshIdx === 9) {
            // Core chassis, spine column and pelvic foundation (ANCHOR BASE - remains pinned with micro-recoil)
            isCore = true;
            subsystem = 'core';
            unlatchVec.set(0, -0.005, -0.015);
            hingeAxisRot.set(0, 0, 0);
            railSlideVec.set(0, -0.01, -0.02);
            phaseStagger = 0.5;
          } else if (meshIdx >= 22 && meshIdx <= 27) {
            // Left Arm Gauntlet & Repulsor Armor Rings (Delicate mechanical ring fan around wrist)
            subsystem = 'left_arm';
            const ringOffset = (meshIdx - 22) * 0.015;
            unlatchVec.set(-0.02 - ringOffset, 0.01, 0.02);
            hingeAxisRot.set(0.05, 0.1, -0.15);
            railSlideVec.set(-0.12 - ringOffset * 2.0, 0.02, 0.05);
            phaseStagger = 0.20 + ringOffset;
          } else if (meshIdx === 6) {
            // Right Chest / Shoulder Plate (Exclusively Right Side)
            subsystem = 'right_chest';
            unlatchVec.set(0.06, 0.03, 0.08);
            hingeAxisRot.set(-0.25, 0.65, -0.22);
            railSlideVec.set(0.48, 0.15, 0.42);
            phaseStagger = 0.10;
          } else if (meshIdx === 17) {
            // Left Shin / Calf Aerodynamic Flap (Exclusively Left Side)
            subsystem = 'left_leg';
            unlatchVec.set(-0.05, -0.02, 0.05);
            hingeAxisRot.set(0.35, 0.25, 0.30);
            railSlideVec.set(-0.42, -0.30, 0.25);
            phaseStagger = 0.22;
          } else if (meshIdx === 21) {
            // Center Arc Reactor Optical Frame / Bezel
            subsystem = 'reactor';
            unlatchVec.set(0, 0.01, 0.08);
            hingeAxisRot.set(0, 0, 0.1);
            railSlideVec.set(0, 0.04, 0.55);
            phaseStagger = 0.08;
          } else if (relY > 0.76) {
            // Head / Faceplate / Crown Cowl
            subsystem = 'head';
            unlatchVec.set(0, 0.04, 0.07);
            hingeAxisRot.set(-0.65, 0, 0); // Visor flips up 37 degrees
            railSlideVec.set(0, 0.38, 0.32);
            phaseStagger = 0.05;
          } else if (relY < 0.45) {
            // Leg Lower / Boot Flaps (Symmetrical Z separation)
            subsystem = 'legs';
            const signZ = relZ >= 0 ? 1 : -1;
            unlatchVec.set(0, -0.03, signZ * 0.05);
            hingeAxisRot.set(signZ * 0.35, 0, 0);
            railSlideVec.set(0, -0.38, signZ * 0.32);
            phaseStagger = 0.26;
          } else {
            // Bilateral Upper Torso / Pectorals / Back Wings (Symmetrical Z separation)
            subsystem = 'torso';
            const signZ = relZ >= 0 ? 1 : -1;
            unlatchVec.set(0, 0.03, signZ * 0.08);
            hingeAxisRot.set(-0.25, 0, 0);
            railSlideVec.set(0, 0.18, signZ * 0.46);
            phaseStagger = 0.12;
          }

          // Transform vectors to object local coordinate space
          const origLocalPos = child.position.clone();
          const targetWorldPos = origWorldPos.clone().add(railSlideVec);
          const targetLocalPos = child.parent ? child.parent.worldToLocal(targetWorldPos.clone()) : targetWorldPos;
          const localRailVector = targetLocalPos.clone().sub(origLocalPos);

          const unlatchWorldPos = origWorldPos.clone().add(unlatchVec);
          const unlatchLocalPos = child.parent ? child.parent.worldToLocal(unlatchWorldPos.clone()) : unlatchWorldPos;
          const localUnlatchVector = unlatchLocalPos.clone().sub(origLocalPos);

          armorParts.push({
            mesh: child,
            idx: meshIdx,
            subsystem: subsystem,
            isCore: isCore,
            origLocalPos: origLocalPos,
            origWorldPos: origWorldPos,
            boxCenterWorld: meshCenter.clone(),
            origRot: child.rotation.clone(),
            localUnlatchVector: localUnlatchVector,
            localRailVector: localRailVector,
            hingeAxisRot: hingeAxisRot,
            phaseStagger: phaseStagger,
            floatPhase: meshIdx * 0.38,
            floatSpeed: 1.1 + (meshIdx % 3) * 0.25
          });

          meshIdx++;
        }
      });

      // Initialize mechanical hydraulic links and laser tethers
      initMechanicalLinkageVisuals(armorParts.length);

      loaderElem.style.opacity = '0';
      setTimeout(() => { loaderElem.style.display = 'none'; }, 500);

      applyDeconstructFactor(0.0, 0);

      // Check URL param for instant preview
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('t')) {
        setTimeout(() => {
          const val = parseFloat(urlParams.get('t'));
          deconstructProgress = val;
          applyDeconstructFactor(val, 0);
          updateUI(val);
        }, 120);
      }
    }

    // Load Model with DRACOLoader
    const loader = window.gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load('models/mark85_v2.glb', (gltf) => {
      setupMark85Engine(gltf);
      loadAnimatedSkeletalModel();
    }, undefined, (err) => {
      console.error('Mark 85 load error:', err);
      loaderElem.querySelector('.loader-text').textContent = '加载失败，请检查模型文件';
    });

    // Smoothstep Kinematic Easing
    function smoothStep(t) {
      const clamped = Math.max(0, Math.min(1, t));
      return clamped * clamped * (3 - 2 * clamped);
    }

    // Multi-stage Kinematic Curve: Maps global factor [0, 1] into 3 distinct mechanical stages
    // Stage 1 (0.00 -> 0.18): Pneumatic Unlatch & Micro-Unlock
    // Stage 2 (0.18 -> 0.58): Hinge Rotation & Flap Opening
    // Stage 3 (0.35 -> 1.00): Linear Rail Extension & Forcefield Stasis
    function getKinematicStages(factor, stagger) {
      const adjusted = Math.max(0, Math.min(1, (factor - stagger) / (1.0 - stagger * 0.65)));

      // 1. Unlatch factor (fast explosive release)
      const unlatchT = smoothStep(adjusted / 0.20);

      // 2. Hinge rotation factor (opens from 0.15 to 0.65)
      const hingeRaw = (adjusted - 0.15) / 0.50;
      const hingeT = smoothStep(hingeRaw);

      // 3. Rail slide factor (smooth linear travel from 0.25 to 1.0)
      const railRaw = (adjusted - 0.25) / 0.75;
      const railT = smoothStep(railRaw);

      return { unlatchT, hingeT, railT, active: adjusted > 0.001 };
    }

    // Temporary math objects to avoid garbage collection
    const vCurrentWorld = new THREE.Vector3();
    const vOffset = new THREE.Vector3();
    const vPistonMid = new THREE.Vector3();

    // --- Core Mechanical Kinematics Executor ---
    function applyDeconstructFactor(factor, elapsedTime) {
      let lineVertexIdx = 0;

      for (let i = 0; i < armorParts.length; i++) {
        const p = armorParts[i];
        const stages = getKinematicStages(factor, p.phaseStagger);

        // Combined position: Unlatch pop + Rail slide travel
        vOffset.set(0, 0, 0)
          .addScaledVector(p.localUnlatchVector, stages.unlatchT)
          .addScaledVector(p.localRailVector, stages.railT);

        // Zero-G micro-float (only active when fully open)
        let floatY = 0, floatX = 0;
        if (stages.railT > 0.15 && !p.isCore) {
          const wave = Math.sin(elapsedTime * p.floatSpeed + p.floatPhase);
          floatY = wave * 0.015 * stages.railT;
          floatX = Math.cos(elapsedTime * p.floatSpeed * 0.8 + p.floatPhase) * 0.008 * stages.railT;
        }

        // 1. Apply Kinematic Position
        p.mesh.position.set(
          p.origLocalPos.x + vOffset.x + floatX,
          p.origLocalPos.y + vOffset.y + floatY,
          p.origLocalPos.z + vOffset.z
        );

        // 2. Apply Mechanical Hinge Rotation (True mechanical joint rotation!)
        p.mesh.rotation.x = p.origRot.x + p.hingeAxisRot.x * stages.hingeT;
        p.mesh.rotation.y = p.origRot.y + p.hingeAxisRot.y * stages.hingeT;
        p.mesh.rotation.z = p.origRot.z + p.hingeAxisRot.z * stages.hingeT;

        p.mesh.getWorldPosition(vCurrentWorld);
        const worldDelta = vCurrentWorld.clone().sub(p.origWorldPos);
        const anchorPos = p.boxCenterWorld;
        const currentPos = anchorPos.clone().add(worldDelta);
        const dist = worldDelta.length();

        // 3. Update Metallic Hydraulic Piston Struts (True World Transform)
        if (strutMeshes[i]) {
          const strut = strutMeshes[i];
          if (showStruts && dist > 0.035 && !p.isCore) {
            strut.visible = true;
            strut.position.copy(anchorPos);
            strut.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), worldDelta.clone().normalize());
            strut.scale.set(1, dist, 1);
          } else {
            strut.visible = false;
          }
        }

        // 4. Update Nanotech Laser Tethers (True World Transform)
        if (tetherPositions) {
          tetherPositions[lineVertexIdx++] = anchorPos.x;
          tetherPositions[lineVertexIdx++] = anchorPos.y;
          tetherPositions[lineVertexIdx++] = anchorPos.z;

          tetherPositions[lineVertexIdx++] = currentPos.x;
          tetherPositions[lineVertexIdx++] = currentPos.y;
          tetherPositions[lineVertexIdx++] = currentPos.z;
        }
      }

      // Update Tethers
      if (tetherLines) {
        tetherLines.geometry.attributes.position.needsUpdate = true;
        const laserPulse = (Math.sin(elapsedTime * 6.0) + 1.0) * 0.2 + 0.6;
        tetherLines.material.opacity = showTethers ? Math.min(0.7, factor * 1.3) * laserPulse : 0;
      }

      // Pulsing Reactor Light
      const reactorPulse = Math.sin(elapsedTime * 4.0) * 0.3 + 1.0;
      reactorLight.intensity = (4.0 + factor * 4.0) * reactorPulse;
    }

    // --- Update UI Sequence & Text Indicators ---
    function updateUI(factor) {
      dockSlider.value = Math.round(factor * 1000);
      dockStatusNum.textContent = Math.round(factor * 100) + '%';

      // Sequence Tracker highlight
      stepElems.forEach(el => el.classList.remove('active'));
      if (factor < 0.20) {
        stepElems[0].classList.add('active');
        stageText.textContent = '① 气动机械锁扣弹出 // 压力泄放';
      } else if (factor < 0.58) {
        stepElems[1].classList.add('active');
        stageText.textContent = '② 关节机械铰链外翻 // 核心外露';
      } else if (factor < 0.88) {
        stepElems[2].classList.add('active');
        stageText.textContent = '③ 装甲滑轨线性扩展 // 机械解构';
      } else {
        stepElems[3].classList.add('active');
        stageText.textContent = '④ 全机甲悬浮检阅 // 力场定格状态';
      }

      
      // Realtime Stark Industries Telemetry
      const elSys = document.getElementById('hud-sys-status');
      const elPress = document.getElementById('hud-pressure');
      const elTorq = document.getElementById('hud-torque');
      const elLocks = document.getElementById('hud-locks');
      const elReact = document.getElementById('hud-reactor');
      const elDisp = document.getElementById('hud-displacement');
      const elElev = document.getElementById('hud-elevation');
      const elStrut = document.getElementById('hud-strut-ext');
      const elVolt = document.getElementById('hud-tether-volt');

      if (elDisp) {
        elDisp.textContent = (factor * 520).toFixed(1) + ' mm';
        elElev.textContent = (factor * 38.5).toFixed(1) + '°';
        elStrut.textContent = (factor * 34.2).toFixed(1) + ' cm';
        elVolt.textContent = factor > 0.05 ? Math.round(12 + factor * 115) + ' kV' : '0 kV';
        
        if (factor <= 0.02) {
          elSys.textContent = 'STANDBY';
          elSys.classList.remove('active');
          elLocks.textContent = 'LOCKED';
          elLocks.classList.add('active');
          elPress.textContent = '14.7 PSI';
          elTorq.textContent = '0 Nm';
          elReact.textContent = '1.2 GJ/s';
        } else if (factor < 0.20) {
          elSys.textContent = 'DECOMPRESSING';
          elSys.classList.add('active');
          elLocks.textContent = 'RELEASED';
          elLocks.classList.remove('active');
          elPress.textContent = ((1.0 - factor / 0.20) * 88.5 + 14.7).toFixed(1) + ' PSI';
          elTorq.textContent = '2,400 Nm';
          elReact.textContent = (2.5 + factor * 10).toFixed(1) + ' GJ/s';
        } else if (factor < 0.88) {
          elSys.textContent = 'ACTUATING';
          elSys.classList.add('active');
          elLocks.textContent = 'UNCOUPLED';
          elLocks.classList.remove('active');
          elPress.textContent = '4.2 PSI';
          elTorq.textContent = (3500 + Math.sin(factor * 12) * 800).toFixed(0) + ' Nm';
          elReact.textContent = (6.0 + factor * 4.5).toFixed(1) + ' GJ/s';
        } else {
          elSys.textContent = 'STASIS LEVITATION';
          elSys.classList.add('active');
          elLocks.textContent = 'HOVER FIELD';
          elLocks.classList.add('active');
          elPress.textContent = '0.0 PSI';
          elTorq.textContent = '650 Nm';
          elReact.textContent = '12.8 GJ/s';
        }
      }

      if (factor <= 0.02) {
        stageText.textContent = '战甲完全闭合 // 待命状态';
        playText.textContent = '启动机械解构';
        playIcon.textContent = '▶';
        btnTogglePlay.classList.remove('active');
      } else if (factor >= 0.98) {
        playText.textContent = '机械咬合复位';
        playIcon.textContent = '🔄';
      } else {
        playText.textContent = '暂停';
        playIcon.textContent = '⏸';
        btnTogglePlay.classList.add('active');
      }
    }

    // --- Interactive Play Controller ---
    function togglePlay() {
      AudioEngine.init();
      if (isPlaying) {
        isPlaying = false;
        btnTogglePlay.classList.remove('active');
        playIcon.textContent = '▶';
        playText.textContent = playDirection > 0 ? '继续解构' : '继续复原';
      } else {
        isPlaying = true;
        btnTogglePlay.classList.add('active');
        playIcon.textContent = '⏸';
        playText.textContent = '暂停';

        if (deconstructProgress >= 0.99) {
          playDirection = -1; // Reverse to reassemble
          AudioEngine.playServoActuator(1.2);
          setTimeout(() => AudioEngine.playHydraulicSlide(), 250);
        } else if (deconstructProgress <= 0.01) {
          playDirection = 1; // Start unlatching
          AudioEngine.playPneumaticVent();
          setTimeout(() => AudioEngine.playServoActuator(1.0), 380);
          setTimeout(() => AudioEngine.playArcReactorPower(), 200);
        }
      }
    }

    btnTogglePlay.addEventListener('click', togglePlay);

    // Spacebar hotkey
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    });

    // Slider scrubbing with Mark V Ratchet Clicks
    let lastSliderVal = 0;
    dockSlider.addEventListener('input', (e) => {
      AudioEngine.init();
      isPlaying = false;
      btnTogglePlay.classList.remove('active');
      const val = parseFloat(e.target.value);
      deconstructProgress = val / 1000;
      
      // Trigger subtle mechanical ratchet ticks when scrubbing
      if (Math.abs(val - lastSliderVal) > 18) {
        AudioEngine.playRatchetCascade(2, 12);
        lastSliderVal = val;
      }
      
      applyDeconstructFactor(deconstructProgress, clock.getElapsedTime());
      updateUI(deconstructProgress);
    });

    // Toggle Hydraulic Struts
    btnStrut.addEventListener('click', () => {
      showStruts = !showStruts;
      btnStrut.classList.toggle('active', showStruts);
      strutPistonGroup.visible = showStruts;
    });

    // Toggle Nanotech Tether Laser Lines
    btnTether.addEventListener('click', () => {
      showTethers = !showTethers;
      btnTether.classList.toggle('active', showTethers);
      if (tetherLines) tetherLines.visible = showTethers;
    });

    // Toggle Loop
    btnLoop.addEventListener('click', () => {
      isLooping = !isLooping;
      btnLoop.classList.toggle('active', isLooping);
    });

    // Toggle Speed
    const speeds = [1.0, 0.5, 2.0];
    let speedIdx = 0;
    btnSpeed.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      playSpeed = speeds[speedIdx];
      btnSpeed.textContent = playSpeed.toFixed(1) + 'x';
    });

    // Reset Button
    btnReset.addEventListener('click', () => {
      isPlaying = false;
      playDirection = 1;
      deconstructProgress = 0.0;
      applyDeconstructFactor(0.0, 0);
      updateUI(0.0);
      AudioEngine.playArmorLockingClang();
    });

    // Auto-dim Dock on Mouse Inactivity
    let idleTimer = null;
    window.addEventListener('pointermove', () => {
      minimalDock.classList.remove('dimmed');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!minimalDock.matches(':hover')) {
          minimalDock.classList.add('dimmed');
        }
      }, 3500);
    });

    // --- Main Animation Loop ---
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      controls.update();
      if (animMixer && currentAppMode === 'action') animMixer.update(delta);

      if (isPlaying) {
        const step = (delta / 4.2) * playSpeed * playDirection;
        const prevP = deconstructProgress;
        deconstructProgress += step;

        // Cinema Sound Stage Triggers across 4 Mechanical Milestones (Iron Man 2 Mark V Suitcase Profile)
        if (playDirection > 0) {
          // Deconstruction Sequence:
          // Micro ratchet cascade in early unlatch
          if (prevP < 0.08 && deconstructProgress >= 0.08) {
            AudioEngine.playRatchetCascade(5, 20);
          }
          // Stage 2 (0.18): Servo motors rotate flaps outward with high whine
          if (prevP < 0.18 && deconstructProgress >= 0.18) {
            AudioEngine.playServoActuator(1.2);
            AudioEngine.playRatchetCascade(7, 24);
          }
          // Stage 3 (0.50): Hydraulic pistons slide out on linear guide rails + dense ratchet teeth
          if (prevP < 0.50 && deconstructProgress >= 0.50) {
            AudioEngine.playHydraulicSlide();
            setTimeout(() => AudioEngine.playServoActuator(0.88), 180);
            setTimeout(() => AudioEngine.playRatchetCascade(6, 25), 320);
          }
          // Stage 4 (0.85): Forcefield stasis humming lock
          if (prevP < 0.85 && deconstructProgress >= 0.85) {
            AudioEngine.playArcReactorPower();
            AudioEngine.playRatchetCascade(4, 30);
          }
        } else {
          // Reassembly Sequence (Reverse):
          // Stage 3 -> 2 (0.55): Hydraulic glide retraction + closing teeth clicks
          if (prevP > 0.55 && deconstructProgress <= 0.55) {
            AudioEngine.playHydraulicSlide();
            setTimeout(() => AudioEngine.playServoActuator(1.05), 180);
            AudioEngine.playRatchetCascade(8, 22);
          }
          // Stage 2 -> 1 (0.22): Servo flaps folding back with fast ratchets
          if (prevP > 0.22 && deconstructProgress <= 0.22) {
            AudioEngine.playServoActuator(1.25);
            AudioEngine.playRatchetCascade(10, 18);
          }
          // Stage 1 (0.05): Air compression hiss before final lock
          if (prevP > 0.06 && deconstructProgress <= 0.06) {
            AudioEngine.playPneumaticVent();
          }
        }

        if (deconstructProgress >= 1.0) {
          deconstructProgress = 1.0;
          if (isLooping) {
            playDirection = -1;
            AudioEngine.playServoActuator(1.2);
            setTimeout(() => AudioEngine.playHydraulicSlide(), 200);
          } else {
            isPlaying = false;
          }
        } else if (deconstructProgress <= 0.0) {
          deconstructProgress = 0.0;
          AudioEngine.playArmorLockingClang();
          if (isLooping) {
            playDirection = 1;
            setTimeout(() => {
              AudioEngine.playPneumaticVent();
              setTimeout(() => AudioEngine.playServoActuator(1.0), 380);
            }, 600);
          } else {
            isPlaying = false;
          }
        }

        updateUI(deconstructProgress);
      }

      applyDeconstructFactor(deconstructProgress, elapsed);

      particles.rotation.y += 0.0008;
      if (typeof holoRing1 !== 'undefined') {
        holoRing1.rotation.z += 0.004;
        holoRing2.rotation.z -= 0.002;
        holoGrid.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  