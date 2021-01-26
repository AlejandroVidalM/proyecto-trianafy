import mongoose from 'mongoose';
import { songSchema } from './songs';
import { userSchema} from './user';
const { Schema } = mongoose;

const playlistsSchema = new Schema({
    name: String,
    description: String,
    user_id: {
        type: mongoose.ObjectId,
        ref: 'User'
      },
    songs: [{
        type: mongoose.ObjectId,
        ref: 'Song'
    }]

});
const Playlist = mongoose.model('Playlist', playlistsSchema);

export {playlistsSchema}