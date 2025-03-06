<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let containerDiv: HTMLDivElement;
	let scene: any = null;
	let camera: any = null;
	let renderer: any = null;
	let particles: any = null;
	let animationFrameId: number | null = null;
	let mounted = false;
	let THREE: any = null;

	const particleCount = 150;
	const particleRadius = 300;

	async function loadThree() {
		if (!browser) return null;
		try {
			THREE = await import('three');
			return true;
		} catch (error) {
			console.error('Failed to load Three.js:', error);
			return false;
		}
	}

	function createParticleTexture() {
		if (!browser || !THREE) return null;
		const canvas = document.createElement('canvas');
		canvas.width = 32;
		canvas.height = 32;
		const ctx = canvas.getContext('2d');
		if (!ctx) return null;

		const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
		gradient.addColorStop(0, 'rgba(100, 255, 218, 1)');
		gradient.addColorStop(0.2, 'rgba(100, 255, 218, 0.8)');
		gradient.addColorStop(0.5, 'rgba(100, 255, 218, 0.3)');
		gradient.addColorStop(1, 'rgba(0, 64, 54, 0)');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 32, 32);

		return new THREE.CanvasTexture(canvas);
	}

	async function init() {
		if (!browser || !canvas || !containerDiv || mounted) return;
		
		const loaded = await loadThree();
		if (!loaded) return;
		
		mounted = true;

		try {
			scene = new THREE.Scene();

			const width = containerDiv.clientWidth || window.innerWidth;
			const height = containerDiv.clientHeight || window.innerHeight;
			const aspect = width / height;

			camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
			camera.position.z = 400;

			renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: true,
				powerPreference: 'high-performance'
			});

			renderer.setSize(width, height, false);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 0);

			const geometry = new THREE.BufferGeometry();
			const positions = new Float32Array(particleCount * 3);
			const velocities = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);

			for (let i = 0; i < particleCount; i++) {
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos(2 * Math.random() - 1);
				const r = particleRadius * (0.5 + Math.random() * 0.5);

				positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
				positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
				positions[i * 3 + 2] = r * Math.cos(phi);

				velocities[i * 3] = (Math.random() - 0.5) * 0.5;
				velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
				velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

				const baseColor = new THREE.Color('#64ffda');
				const hueVariation = (Math.random() - 0.5) * 0.1;
				const color = new THREE.Color().setHSL(
					baseColor.getHSL({}).h + hueVariation,
					0.8,
					0.8
				);
				colors[i * 3] = color.r;
				colors[i * 3 + 1] = color.g;
				colors[i * 3 + 2] = color.b;
			}

			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
			geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

			const texture = createParticleTexture();
			const material = new THREE.PointsMaterial({
				size: 15,
				map: texture,
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
				vertexColors: true
			});

			particles = new THREE.Points(geometry, material);
			scene.add(particles);

			animate();
		} catch (error) {
			console.error('Error initializing Three.js:', error);
			cleanup();
		}
	}

	function animate() {
		if (!mounted || !scene || !camera || !renderer || !particles) return;

		animationFrameId = requestAnimationFrame(animate);

		particles.rotation.x += 0.0005;
		particles.rotation.y += 0.001;

		const positions = particles.geometry.getAttribute('position');
		const velocities = particles.geometry.getAttribute('velocity');

		for (let i = 0; i < particleCount; i++) {
			positions.array[i * 3] += velocities.array[i * 3];
			positions.array[i * 3 + 1] += velocities.array[i * 3 + 1];
			positions.array[i * 3 + 2] += velocities.array[i * 3 + 2];
		}

		positions.needsUpdate = true;
		renderer.render(scene, camera);
	}

	function handleResize() {
		if (!mounted || !containerDiv || !camera || !renderer) return;

		const width = containerDiv.clientWidth || window.innerWidth;
		const height = containerDiv.clientHeight || window.innerHeight;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height, false);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	function cleanup() {
		mounted = false;
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (particles) {
			particles.geometry.dispose();
			if (particles.material instanceof THREE.Material) {
				particles.material.dispose();
			}
			particles = null;
		}

		if (renderer) {
			renderer.dispose();
			renderer = null;
		}

		scene = null;
		camera = null;
		THREE = null;
	}

	onMount(() => {
		if (!browser) return;
		
		window.addEventListener('resize', handleResize);
		init();

		return () => {
			window.removeEventListener('resize', handleResize);
			cleanup();
		};
	});

	onDestroy(() => {
		cleanup();
	});
</script>

<div class="absolute inset-0 overflow-hidden" bind:this={containerDiv}>
	<canvas bind:this={canvas} />
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
