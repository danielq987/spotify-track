# spotify-track

Track friend activity. Uses [Spotify Buddylist](https://github.com/valeriangalliat/spotify-buddylist) to retrieve information from Spotify.

## Usage

To use, an `sp_dc` cookie must be obtained from the [Spotify Web Player](https://open.spotify.com). Details on how can be found [here](https://github.com/valeriangalliat/spotify-buddylist).

Clone the repo and create a `.env` file in the root directory, similar to what is seen below. The `DB_URI` parameter is optional, and if not provided, will simply log output to the console. Otherwise, data will be logged into the mongoDb database specified by the connection string.

```
SPDC_COOKIE=<your cookie here>
DB_URI=<your mongoDb connection string>
```

To start, run `npm install`. Compile `src` into `dist` directory using `npm run build`. Finally, run `npm start`.
