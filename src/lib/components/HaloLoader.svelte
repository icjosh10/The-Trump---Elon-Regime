<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;
	let scene = $state<THREE.Scene | null>(null);
	let camera = $state<THREE.PerspectiveCamera | null>(null);
	let renderer = $state<THREE.WebGLRenderer | null>(null);
	let particles = $state<THREE.Points | null>(null);
	let animationFrameId = $state<number | null>(null);
	let containerDiv = $state<HTMLDivElement | null>(null);
	let mounted = $state(false);

	// Pre-create geometry and material
	const geometry = new THREE.BufferGeometry();
	const vertices = [];
	const colors = [];
	const sizes = [];
	const particleCount = 20000;
	const radius = 600;

	// Initialize particle data before mount
	for (let i = 0; i < particleCount; i++) {
		const phi = Math.random() * Math.PI * 2;
		const theta = Math.acos(Math.random() * 2 - 1);

		const x = radius * Math.sin(theta) * Math.cos(phi);
		const y = radius * Math.sin(theta) * Math.sin(phi);
		const z = radius * Math.cos(theta);

		vertices.push(x, y, z);

		const intensity = 0.5 + Math.random() * 0.5;
		const mixFactor = Math.random();
		const r = mixFactor * 0.376 * intensity;
		const g = (0.765 + mixFactor * 0.172) * intensity;
		const b = intensity;

		colors.push(r, g, b);
		sizes.push(1 + Math.random() * 2);
	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

	const material = new THREE.PointsMaterial({
		size: 2,
		sizeAttenuation: true,
		vertexColors: true,
		transparent: true,
		opacity: 0.6,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});

	const initParticles = () => {
		if (!canvas || !mounted) {
			console.error('Canvas not found or component not mounted');
			return;
		}

		try {
			scene = new THREE.Scene();

			const width = containerDiv.clientWidth;
			const height = containerDiv.clientHeight;

			camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 2000);
			camera.position.z = 800;
			camera.lookAt(0, 0, 0);

			renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: true,
				powerPreference: 'high-performance'
			});
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x0c1c2c, 0.1);

			particles = new THREE.Points(geometry, material);
			scene.add(particles);

			animate();
		} catch (error) {
			console.error('Error initializing particles:', error);
		}
	};

	const animate = () => {
		if (!scene || !camera || !renderer || !particles) return;

		particles.rotation.y += 0.001;
		particles.rotation.z += 0.0005;

		renderer.render(scene, camera);
		animationFrameId = requestAnimationFrame(animate);
	};

	const cleanup = () => {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (scene && particles) {
			scene.remove(particles);
			particles.geometry.dispose();
			(particles.material as THREE.PointsMaterial).dispose();
			particles = null;
		}

		if (renderer) {
			renderer.dispose();
			renderer = null;
		}

		scene = null;
		camera = null;
	};

	const handleResize = () => {
		if (!camera || !renderer || !containerDiv) return;

		const width = containerDiv.clientWidth;
		const height = containerDiv.clientHeight;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
	};

	// Initialize as soon as possible
	$effect(() => {
		if (canvas && containerDiv && !scene) {
			mounted = true;
			initParticles();
		}
	});

	onMount(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			cleanup();
		};
	});
</script>

<div
	bind:this={containerDiv}
	class="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1c2c]">
	<canvas
		bind:this={canvas}
		class="absolute inset-0 h-full w-full"
		style="pointer-events: none; z-index: 1;" />

	<div class="pointer-events-none relative z-10 flex flex-col items-center justify-center">
		<div class="relative h-32 w-32">
			<div
				class="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-t-[#00C3FF]"
				style="box-shadow: 0 0 20px rgba(0, 195, 255, 0.2);" />
			<div class="absolute inset-0 flex items-center justify-center">
				<span class="text-glow text-lg font-bold text-[#00C3FF]">LOADING</span>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.text-glow) {
		text-shadow: 0 0 10px rgba(0, 195, 255, 0.5);
	}
</style>
