export interface Song {
  id: string;
  user_id: string;
  title: string;
  author: string;
  song_path: string;
  image_path: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Sound {
  play: () => void;
  pause: () => void;
  stop: () => void;
  volume: (value?: number) => void | number;
  rate: (value?: number) => void | number;
  seek: (value?: number) => void | number;
}
