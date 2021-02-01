import { Router } from 'express';
import { token } from '../services/passport'
import { playlistController } from '../controller/PlaylistController';
import { validar } from '../middlewares/validacion';
import { body } from 'express-validator';

const router = Router();

router.get('/', validar, token(), playlistController.todasLasPlaylist);
router.post('/',[token(),body('id').not().exists().withMessage('No hace falta que indiques ID.')],
            validar,
            playlistController.nuevaPlaylist);
router.get('/:id', token(), playlistController.playlistPorId);
router.put('/:id', token(), playlistController.editarPlaylist);
router.delete('/:id', token(), playlistController.eliminarPlaylist);
router.post('/:idPlaylist/songs/:idSong', token(), playlistController.addSong);
router.delete('/:idPlaylist/songs/:idSong', token(), playlistController.deleteSong);



export default router;