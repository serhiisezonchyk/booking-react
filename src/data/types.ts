export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  createdAt: string;
}
export interface Post {
  id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: TypeType;
  property: TypeProperty;
  createdAt: Date;
  isSaved?: boolean;
  userId: string;
}
export interface PostDetails {
  id: string;
  desc: string;
  utilities: string | null;
  pet: string | null;
  income: string | null;
  size: number | null;
  school: number | null;
  bus: number | null;
  restaurant: number | null;
  postId: string;
}
export type TypeType = 'buy' | 'rent';
export type TypeProperty = 'apartment' | 'house' | 'condo' | 'land';
export interface QueryParam {
  type: TypeType;
  city: string;
  minPrice: number;
  maxPrice: number;
}
export type MapTypes = 'default' | 'rounded';
