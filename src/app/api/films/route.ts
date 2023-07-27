import { NextResponse } from "next/server";

const secret_key = process.env.SECRETKEY;
const TV_URL =
  "https://api.themoviedb.org/3/discover/tv?language=fr&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false&include_adult=false&external_source=imdb_id,freebase_mid,freebase_id,tvdb_id,tvrage_id,facebook_id,twitter_id,instagram_id&query=&mediaType=tv&SECRETKEYHERE";
const FILM_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=2&timezone=America/New_York&include_null_first_air_dates=false&include_adult=true&external_source=imdb_id,freebase_mid,freebase_id,tvdb_id,tvrage_id,facebook_id,twitter_id,instagram_id&query=&mediaType=movie&SECRETKEYHERE";

export async function GET() {
  const res = await fetch(
    FILM_URL.replace("SECRETKEYHERE", "api_key=" + secret_key),
    {
      next: { revalidate: 1010 },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return NextResponse.json({ data });
}
