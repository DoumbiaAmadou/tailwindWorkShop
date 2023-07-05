import { NextResponse } from 'next/server'
 
const secret_key = process.env.SECRETKEY;
const URL = 'https://api.themoviedb.org/3/discover/tv?language=fr&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false&include_adult=true&external_source=imdb_id,freebase_mid,freebase_id,tvdb_id,tvrage_id,facebook_id,twitter_id,instagram_id&query=&mediaType=tv&SECRETKEYHERE'

export async function GET() {
  const res = await fetch(URL.replace('SECRETKEYHERE','api_key='+secret_key), {
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.secret_key && { 'API-Key': process.env.secret_key })
    },
  })
  const data = await res.json()
  return NextResponse.json({ data })
}