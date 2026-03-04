import { app } from '@/app';
import { create } from './ create';
import { fetch } from './fetch';

export async function ongsRoutes() {
  app.post('/ongs', create);
  app.get('/ongs', fetch);
}
