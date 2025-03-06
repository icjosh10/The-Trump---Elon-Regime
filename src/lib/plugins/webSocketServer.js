import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer({ httpServer }) {
		if (!httpServer) return;

		const io = new Server(httpServer, {
			cors: {
				origin: ['http://localhost:3000', 'https://admin.socket.io'],
				credentials: false
			}
		});

		instrument(io, {
			namespaceName: '/custom',
			auth: false,
			mode: 'development'
		});
	}
};

export default webSocketServer;
