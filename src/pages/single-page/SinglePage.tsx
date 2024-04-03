import Map from '../../components/map/Map';
import Slider from '../../components/slider/Slider';
import { singlePostData, userData } from '../../data/dummydata';
const SinglePage = () => {
  return (
    <div className="single-page container">
      <div className="single-page__details hide-scroll">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="single-page__details-info">
            <div className="details-info--top">
              <div className="single-page__post post">
                <h1 className="post-title">{singlePostData.address}</h1>
                <div className="post-address">
                  <img className="post-address__img" src="/pin.png" alt="Pin" />
                  <span className="post-address__span">{singlePostData.address}</span>
                </div>
                <div className="post-price">$ {singlePostData.price}</div>
              </div>
              <div className="details-info--top__user">
                <img className="img" src={userData.img} alt="User avatar" />
                <span className="span">{userData.name}</span>
              </div>
            </div>
            <div className="details-info--bottom">{singlePostData.description}</div>
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
                <p className="feature__text-p">Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="Utility image" />
              <div className="feature__text">
                <span className="feature__text-span">Get policy</span>
                <p className="feature__text-p">Pets allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="Utility image" />
              <div className="feature__text">
                <span className="feature__text-span">Property Fees</span>
                <p className="feature__text-p">Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="single-page__features__title">Room sizes</p>
          <div className="single-page__features__sizes">
            <div className="size">
              <img src="/size.png" alt="Size image" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="Bed image" />
              <span>1 bathroom</span>
            </div>
            <div className="size">
              <img src="/size.png" alt="Size image" />
              <span>80 sqft</span>
            </div>
          </div>
          <p className="single-page__features__title">Nearby places</p>
          <div className="single-page__features__places">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="feature__text">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="feature__text">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="feature__text">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="single-page__features__title">Location</p>
          <div className="single-page__features__map-container">
            <Map items={[singlePostData]} />
          </div>
          <div className="single-page__features__buttons">
            <button>
              <img src="/chat.png" alt="Chat image" />
              Send a message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save to place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
