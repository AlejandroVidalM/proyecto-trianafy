import { playlistRepository } from '../repository/playlistRepository';
import { songRepository } from '../repository/songRepository';
import {Playlist} from '../models/playlists';
const playlistController = {
    todasLasPlaylist: async (req, res) => {
        console.log("req.user y req.user.id");
        console.log(req.user);
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
        console.log(playlist);
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
            await playlistRepository.updateById(newPlaylist, req.params.id, req.user.id);
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
        try{
            const newSong = await playlistRepository.addSongToPlaylist(
                req.params.idPlaylist,
                req.params.idSong, 
                req.user.id
            );
            if(newSong != null)
                res.status(201).json(newSong);
            else
                res.status(404).json('No se ha encontrado la playlist/cancion en la petición.');

        }catch(error){
            res.status(502).send({Error:`Ha ocurrido un error en la petición: ${error.message}`})
        }
    },
    deleteSong: async (req, res) => {
        try{
            const result = await playlistRepository.deleteSongFromPlaylist(
                req.params.idPlaylist,
                req.params.idSong,
                req.user.id
            );
            res.status(204).json(result);
        }catch(error){
            res.status(502).send({Error:`Ha ocurrido un error en la petición: ${error.message}`})
        }
    },
    getPlaylistSongs: async (req, res) => {
        try{
            const songs = await playlistRepository.getPlaylistSongs(
                req.params.id,
                req.user.id
            );
            console.log("testtesttesttesttesttesttesttesttesttesttest");
            console.log(songs);
            res.status(201).json(songs);
        }catch(error){
            res.status(502).send({Error:`Ha ocurrido un error en la petición: ${error.message}`})
        }
    },
    getSongFromPlaylist: async (req, res) => {
        try{
            const result = await playlistRepository.getSongFromPlaylist(
                req.params.idPlaylist,
                req.params.idSong,
                req.user.id
            );
            res.status(201).json(result);
        }catch(error){
            res.status(502).send({Error:`Ha ocurrido un error en la petición: ${error.message}`})
        }
    }
    // delSongPlaylist: async (req, res) => {
    //     let playlist = await playlistRepository.findById(req.params.id_playlist, req.user.id);
    //     if (playlist != undefined) {
    //         playlist.song.pull(req.params.id_song);
    //         await playlist.save();
    //         res.json(await playlistRepository.findById(playlist._id));
    //     } else {
    //         res.status(400).json({
    //             mensaje: `La película con ID: ${req.params.id_playlist} no está registrada en la base de datos`
    //         });
    //     }
    // }
}

export {
    playlistController
}