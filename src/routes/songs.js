import { Router } from 'express';
import { token } from '../services/passport';
import { SongController } from '../controller/songController';

const router = Router();

router.get('/', token(), SongController.todasLasCanciones);

router.get('/:id', token(), SongController.cancionPorId);

router.post('/', token(), SongController.nuevaCancion);

router.put('/:id', token(), SongController.editarCancion);

router.delete('/:id', token(), SongController.eliminarCancion);

export default router;
