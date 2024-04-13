import DOMPurify from 'dompurify';
import { useContext, useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import Map from '../../components/map/Map';
import Slider from '../../components/slider/Slider';
import { AuthContext } from '../../context/AuthContext';
import { Post, PostDetails, User } from '../../data/types';
import apiRequest from '../../lib/apiRequest';
interface SinglePagePost extends Post {
  postDetails: PostDetails;
  user: Pick<User, 'avatar' | 'username'>;
}
const SinglePage = () => {
  const post = useLoaderData() as SinglePagePost;
  const [saved, setSaved] = useState<boolean | undefined>(post.isSaved);
  const { user } = useContext(AuthContext);
  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!user) redirect('/login');
    try {
      await apiRequest.post('/user/save', { postId: post.id });
    } catch (error) {
      setSaved((prev) => !prev);
      console.log(error);
    }
  };
  return (
    <div className="single-page container">
      <div className="single-page__details hide-scroll">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="single-page__details-info">
            <div className="details-info--top">
              <div className="single-page__post post">
                <h1 className="post-title">{post.address}</h1>
                <div className="post-address">
                  <img className="post-address__img" src="/pin.png" alt="Pin" />
                  <span className="post-address__span">{post.address}</span>
                </div>
                <div className="post-price">$ {post.price}</div>
              </div>
              <div className="details-info--top__user">
                <img className="img" src={post.user.avatar || '/noavatar.jpeg'} alt="User avatar" />
                <span className="span">{post.user.username}</span>
              </div>
            </div>
            <div
              className="details-info--bottom"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetails.desc) }}
            ></div>
          </div>
        </div>
      </div>
      <div className="single-page__features hide-scroll">
        <div className="wrapper">
          <p className="single-page__features__title">General</p>
          <div className="single-page__features__lv">
            <div className="feature">
              <img src="/utility.png" alt="Utility image" />
              <div className="feature__text">
                <span className="feature__text-span">Utilities</span>
                {post.postDetails.utilities === 'owner' ? (
                  <p className="feature__text-p">Owner is responsible</p>
                ) : (
                  <p className="feature__text-p">Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="Utility image" />
              <div className="feature__text">
                <span className="feature__text-span">Get policy</span>
                {post.postDetails.pet === 'allowed' ? (
                  <p className="feature__text-p">Pets allowed</p>
                ) : (
                  <p className="feature__text-p">Pets not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="Utility image" />
              <div className="feature__text">
                <span className="feature__text-span">Income policy</span>
                <p className="feature__text-p">{post.postDetails.income}</p>
              </div>
            </div>
          </div>
          <p className="single-page__features__title">Room sizes</p>
          <div className="single-page__features__sizes">
            <div className="size">
              <img src="/size.png" alt="Size image" />
              <span>{post.postDetails.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="Bath image" />
              <span>{post.bathroom} bathroom</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="Bed image" />
              <span>{post.bedroom} bedroom</span>
            </div>
          </div>
          <p className="single-page__features__title">Nearby places</p>
          <div className="single-page__features__places">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="feature__text">
                <span>School</span>
                <p>
                  {post.postDetails.school! > 999
                    ? post.postDetails.school! / 1000 + 'km '
                    : post.postDetails.school! + 'm '}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="feature__text">
                <span>Bus Stop</span>
                <p>
                  {post.postDetails.bus! > 999 ? post.postDetails.bus! / 1000 + 'km ' : post.postDetails.bus! + 'm '}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="feature__text">
                <span>Restaurant</span>
                <p>
                  {post.postDetails.restaurant! > 999
                    ? post.postDetails.restaurant! / 1000 + 'km '
                    : post.postDetails.restaurant! + 'm '}
                  away
                </p>
              </div>
            </div>
          </div>
          <p className="single-page__features__title">Location</p>
          <div className="single-page__features__map-container">
            <Map items={[post]} type="rounded" />
          </div>
          <div className="single-page__features__buttons">
            <button>
              <img src="/chat.png" alt="Chat image" />
              Send a message
            </button>
            <button onClick={handleSave} className={`${saved?'saved':''}`}>
              <img src="/save.png" alt="" />
              {saved?'Remove from saved':'Save to place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
