import { Schema } from 'redis-om'

const albumSchema = new Schema('album', {
  artist: { type: 'string' },
  title: { type: 'text' },
  year: { type: 'number' },
  genres: { type: 'string[]' },
  songDurations: { type: 'number[]' },
  outOfPublication: { type: 'boolean' }
}, {
    dataStructure: 'JSON'
  })


const point = { longitude: 12.34, latitude: 56.78 }


const studioSchema = new Schema('studio', {
  name: { type: 'string' },
  city: { type: 'string' },
  state: { type: 'string' },
  location: { type: 'point' },
  established: { type: 'date' }
}, {
    dataStructure: 'JSON'
  })