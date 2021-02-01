import { playlistRepository } from '../repository/playlistRepository';
import { songRepository } from '../repository/songRepository';

const playlistController = {
    todasLasPlaylist: async (req, res) => {
        console.log("aAAAAAAAAAAAAAAAAAAGGGGGGGHHHHHHHHHHH");
        console.log(req.user.id);
        const data = await playlistRepository.findAll(req.user.id);
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    playlistPorId: async (req, res) => {
        let playlist = await playlistRepository.findById(req.params.id, req.user.id);
        console.log(req.params.id);
        console.log(req.user.id);
        if (playlist != undefined)
            res.json(playlist);
        else
            res.sendStatus(404);
    },

    nuevaPlaylist: async (req, res) => {
        let playlist = await playlistRepository.create({
            name: req.body.name,
            description: req.body.description,
            user_id: req.user.id
        });
        res.status(201).json(playlist);
    },

    editarPlaylist: async (req, res) => {
        try{
            let newPlaylist = new Playlist({
                name: req.body.name,
                description: req.body.description
            })
            await playlistRepository.updateList(newPlaylist, req.params.id, req.user.id)
            res.status(204).json(newPlaylist);
        }catch(error){
            res.status(404).json({Error:`Ha ocurrido un error en la petición: ${error.message}`})
        }
    },

    eliminarPlaylist: async (req, res) => {
        await playlistRepository.delete(req.params.id, req.user.id);
        res.sendStatus(204);
    },

    addSong: async (req, res) => {
        let song = await songRepository.findById(req.params.idSong);
        if (song != undefined) {
            let playlist = await playlistRepository.findById(req.params.idPlaylist, req.user.id);
            if (playlist != undefined) {
                playlist.songs.push(song._id);
                await playlist.save();
                res.json(await playlistRepository.findById(Playlist._id));
            } else{
                res.status(400).json({
                    mensaje: `La playlist con ID: ${req.params.idPlaylist} no está registrada en la base de datos`
                });
            }
        } else{
            res.status(400).json({
                mensaje: `La cancion con ID: ${req.params.idSong} no está registrada en la base de datos`
            });
        }
    },
    deleteSong: async (req, res) => {
        let playlist = await playlistRepository.findById(req.params.idPlaylist, req.user.id);
        if (playlist != undefined) {
            playlist.songs.pull(req.params.idSong);
            await playlist.save();
            res.json(await playlistRepository.findById(Playlist._id));
        } else{
            res.status(400).json({
                mensaje: `La playlist con ID: ${req.params.idPlaylist} no está registrada en la base de datos`
            });
        }
    }
}

export {
    playlistController
}