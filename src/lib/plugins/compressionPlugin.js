import compression from 'compression';
const compress = compression({ level: 6 });

const compressionPlugin = {
	name: 'compression-plugin',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			compress(req, res, next);
		});
	}
};

export default compressionPlugin;
