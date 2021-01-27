import { Router } from 'express';
import { SongController } from '../controller/songController';

const router = Router();

router.get('/', SongController.todasLasCanciones);

router.get('/:id', SongController.cancionPorId);

router.post('/', SongController.nuevaCancion);

router.put('/:id', SongController.editarCancion);

router.delete('/:id', SongController.eliminarCancion);

export default router;
