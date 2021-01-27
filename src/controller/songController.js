const SongController = {

    todasLasCanciones: async (req, res) => {
        const data = await songRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    cancionPorId: async (req, res) => {

            let song = await songRepository.findById(req.params.id);
            if (song != undefined) {
                res.json(song);
            } else {
                res.sendStatus(404);
            }

    },


    nuevaCancion: async (req, res) => {
        let cancionCreado = await songRepository.create({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        })
        res.status(201).json(cancionCreado);
    },

    editarCancion: async (req, res) => {
        let cancionModificada = await songRepository.updateById(req.params.id, {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        });
        if (cancionModificada == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(cancionModificada);
    },

    eliminarCancion: async (req, res) => {
        await songRepository.delete(req.params.id);
        res.sendStatus(204);
    }


}

export{ SongController }