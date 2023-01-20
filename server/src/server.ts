import fastify from 'fastify';
import cors from '@fastify/cors';
import './lib/dayjs';
import { appRoutes } from './routes';

const app = fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
	port: 3333
}).then(() => {
	console.log('HTTP Server Running on Port 3333');
});
