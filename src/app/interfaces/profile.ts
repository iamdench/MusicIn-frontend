import * as url from 'url';

export interface Profile {
  id?: string;
  name: string;
  images: Array<url>;
  link: string;
  likes: number;
  followers: string;
  likedMe?: string;
  iLiked?: string;
}
