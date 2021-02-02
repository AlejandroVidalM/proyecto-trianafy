import { Playlist } from '../models/playlists';

const playlistRepository = {

    async findAll(id) {
        return await Playlist
        .find({user_id: id})
        .populate('songs')
        .exec();

    },

    async findById(idPlaylist, idUser){
        const result = await Playlist.find({
            _id: idPlaylist,
            user_id: idUser
        })
        .populate('songs')
        .exec();
        console.log("repository");
        console.log(result);
        return result;
    },
    async create(newPlaylist) {
        const playlist = new Playlist({
            name: newPlaylist.name,
            description: newPlaylist.description != undefined ? newPlaylist.description : "",
            user_id: newPlaylist.user_id
        });
        const result = await playlist.save();
        return result;
    },
    async updateById(idPlaylist, modPlaylist, idUser) {
        const playlist = await Playlist.findById(idUser, idPlaylist);
        if (playlist == null){
            return undefined
        }else {
            return await Object.assign(playlist, modPlaylist).save();
        }

    },

    async delete(idPlaylist, idUser) {
        await Pelicula.deleteOne({
            _id: idPlaylist,
            user_id:idUser
        }).exec();
    }
}
export {
    playlistRepository
}