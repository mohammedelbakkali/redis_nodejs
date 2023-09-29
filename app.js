import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { createClient } from 'redis'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

//await client.set('simo', 'bakkali');
//const value = await client.get('simo');
//console.log(value);





// Create a Redis client
//const client = redis.createClient(process.env.REDIS_PORT);




// Set response
function setResponse(username, followers) {
  return `<h2> Data retrieved: username ${username}, followers number: ${followers}</h2>`;
}

// Make request to GitHub for data
async function getRepos(req, res, next) {
  try {
    console.log('Fetching Data...');
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const followers = data.followers;

    // Set data to Redis (key, dateExpire, value)
    await client.set(username, followers);

    res.send(setResponse(username, followers));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } 
}

// Cache middleware

async function cache(req,res,next){
    try{
        const {username } = req.params;
        const data =    await client.get(username);
        if(data !== null){
             res.send(setResponse(username, data));
        }else{
             next();
        }

    }catch(err){
        next();
    }

        
}

app.get('/repos/:username', cache , getRepos);
app.get('/',(req,res,next)=>{
     res.status(200).send('Welcome to page home!')
})


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
