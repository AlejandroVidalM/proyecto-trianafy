import { Playlist } from "../models/playlists";
import { Song } from "../models/songs";

const playlistRepository = {
  async findAll(id) {
    return await Playlist.find({ user_id: id }).populate("songs").exec();
  },

  async findById(idPlaylist, idUser) {
    const result = await Playlist.find({
      _id: idPlaylist,
      user_id: idUser,
    })
      .populate("songs")
      .exec();
    return result;
  },
  async create(newPlaylist) {
    const playlist = new Playlist({
      name: newPlaylist.name,
      description:
        newPlaylist.description != undefined ? newPlaylist.description : "",
      user_id: newPlaylist.user_id,
    });
    const result = await playlist.save();
    return result;
  },
  async updateById(idPlaylist, modPlaylist, idUser) {
    const playlist = await playlistRepository.findById(idUser, idPlaylist);
    if (playlist == null) {
      return undefined;
    } else {
      return await Playlist.assign(playlist, modPlaylist).save();
    }
  },
  async updateById(modPlaylist, idPlaylist, idUser) {
    const result = await Playlist.find({
      _id: idPlaylist,
      user_id: idUser,
    })
      .populate("songs")
      .exec();
    if (result != null) {
      return await Playlist.updateOne(
        {
          _id: idPlaylist,
        },
        {
          name: modPlaylist.name,
          description: modPlaylist.description,
        }
      );
    } else {
      return undefined;
    }
  },

  async delete(idPlaylist, idUser) {
    await Playlist.deleteOne({
      _id: idPlaylist,
      user_id: idUser,
    }).exec();
  },
  async addSongToPlaylist(playlistId, songId, userId) {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      user_id: userId,
    })
      .populate("songs")
      .exec();
    const newSong = await Song.findOne({ _id: songId });
    if (playlist != null && newSong != 0) {
      let songNotIn = playlist.songs.filter((song) => song.equals(newSong));
      if (songNotIn.length == 0) {
        console.log(newSong);
        playlist.songs.push(newSong);
        await playlist.save();
        return playlist;
      }
    }
  },
  async getPlaylistSongs(playlistId, userId) {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      user_id: userId,
    })
      .populate("songs")
      .exec();
    if (playlist != null) {
      return playlist.songs;
    }
  },
  async getSongFromPlaylist(playlistId, songId, userId) {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      user_id: userId,
    })
      .populate({
        path: "songs",
        match: {
          _id: songId,
        },
      })
      .exec();
    return playlist.songs;
  },
//   async deleteSongFromPlaylist(playlistId, songId, userId) {
//     const playlist = await Playlist.findOne({
//       _id: playlistId,
//       user_id: userId,
//     })
//       .populate({
//         path: "songs",
//         match: {
//           _id: songId,
//         },
//       })
//       .exec();
//     playlist.songs.pull(userId);
//     await playlist.save();
//     return playlist;
//   },
  async deleteSongFromPlaylist(playlistId, songId, userId) {
    const playlist = await Playlist.findOne({_id: playlistId, user_id: userId}).exec();
    const song = await Song.findById(songId).exec();
    if(playlist != null && song != 0){
        let idSong = 0;
        for(let i = 0; i < playlist.songs.length; i++){
            console.log(playlist.songs[i]._id);
            if(playlist.songs[i]._id == songId){
                idSong = i;
            }
        }
        playlist.songs.splice(idSong, 1);
        await playlist.save()
        return playlist;
    }
}
  
};
export { playlistRepository };
