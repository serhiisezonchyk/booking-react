import { AxiosResponse } from 'axios';
import { LoaderFunction, defer } from 'react-router-dom';
import { Post } from '../data/types';
import apiRequest from './apiRequest';

export const singlePageloader: LoaderFunction<any> = async ({ request, params }) => {
  const res = await apiRequest.get('/post/' + params.id);
  return res.data?.post;
};

export type DeferPosts = { postResponse: Promise<{ posts: Post[] }> };
export type DeferPostsResponse = AxiosResponse<{ posts: Post[] }>;
export const listPageloader: LoaderFunction<any> = async ({ request }) => {
  const query = request.url.split('?')[1];
  const resPromise = apiRequest.get('/post?' + query);
  return defer({
    postResponse: resPromise,
  });
};
export type DeferProfilePosts = { postResponse: Promise<{ userPosts:Post[], savedPosts:Post[]}> };
export type DeferProfilePostsResponse = AxiosResponse<{ userPosts:Post[], savedPosts:Post[] }>;
export const profilePageloader: LoaderFunction<any> = async () => {
  const resPromise = apiRequest.get('/user/profilePosts');
  return defer({
    postResponse: resPromise,
  });
};

