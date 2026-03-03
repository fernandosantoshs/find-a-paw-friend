import { app } from '@/app';
import { create } from './ create';

export async function ongsRoutes() {
  app.post('/ongs', create);
}
