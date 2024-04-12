import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Map from '../../components/map/Map';
import { DeferPosts, DeferPostsResponse } from '../../lib/loaders';

const ListPage = () => {
  const data = useLoaderData() as DeferPosts;
  return (
    <div className="listPage container">
      <div className="listPage__list-container">
        <div className="list-container__wrapper hide-scroll">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts ...</p>}>
              {(postResponce: DeferPostsResponse) => (
                <>
                  {postResponce.data.posts.map((el) => (
                    <Card key={el.id} item={el} />
                  ))}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="listPage__map-container">
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.postResponse} errorElement={<p>Error loading posts ...</p>}>
            {(postResponce: DeferPostsResponse) => <Map items={postResponce.data.posts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
