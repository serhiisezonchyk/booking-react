export interface Apartment {
  id: number;
  title: string;
  img: string;
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
}
export interface SinglePost {
  id: number;
  title: string;
  price: number;
  images: string[];
  bedRooms: number;
  bathroom: number;
  size: number;
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  school: string;
  bus: string;
  restaurant: string;
  description: string;
}
export interface UserData {
  id: number;
  name: string;
  img: string;
}
export type TypeType = 'buy' | 'rent';
export type TypeProperty = 'Apartment' | 'House' | 'Condo' | 'Land';
export interface QueryParam {
  type: TypeType;
  location: string;
  minPrice: number;
  maxPrice: number;
}
