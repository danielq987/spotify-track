export type Activity = {
  friends: SingleActivity[];
};

type uri = string;

type SingleActivity = {
  timestamp: number;
  user: User;
  track: Track;
};

type User = {
  uri: uri;
  name: string;
  imageUrl: uri;
};

type Track = {
  uri: uri;
  name: string;
  imageUrl: uri;
  album: {
    uri: uri;
    name: string;
  };
  artist: {
    uri: uri;
    name: string;
  };
  context: {
    uri: uri;
    name: string;
    index: number;
  };
};
