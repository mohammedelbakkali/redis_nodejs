import { Repository } from 'redis-om'

const albumRepository = new Repository(albumSchema, redis);
const studioRepository = new Repository(studioSchema, redis);


let album = {
    artist: "Mushroomhead",
    title: "The Righteous & The Butterfly",
    year: 2014,
    genres: [ 'metal' ],
    songDurations: [ 204, 290, 196, 210, 211, 105, 244, 245, 209, 252, 259, 200, 215, 219 ],
    outOfPublication: true
  }
  
  album = await albumRepository.save(album);