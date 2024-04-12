import { AxiosError } from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Uploadwidget from '../../components/upload-widget/Uploadwidget';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
interface ErrorResponse {
  error: string;
  details?: any;
}
const NewPostPage = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>('');
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const el = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post('/post', {
        postData: {
          title: el.title,
          price: parseInt(el.price as string),
          address: el.address,
          city: el.city,
          bedroom: parseInt(el.bedroom as string),
          bathroom: parseInt(el.bathroom as string),
          type: el.type,
          property: el.property,
          latitude: el.latitude,
          longitude: el.longitude,
          images: images,
        },
        postDetails: {
          desc: value,
          utilities: el.utilities,
          pet: el.pet,
          income: el.income,
          size: parseInt(el.size as string),
          school: parseInt(el.school as string),
          bus: parseInt(el.bus as string),
          restaurant: parseInt(el.restaurant as string),
        },
      });
      console.log(res)
      navigate('/'+res.data.post?.id)
    } catch (error) {
      const message: ErrorResponse = (error as AxiosError).response?.data as ErrorResponse;
      setError(message?.error || 'An error occured.');
    }
  };
  return (
    <div className="new-post-page container">
      <div className="new-post-page__form-container form-container hide-scroll">
        <h1 className="form-container__title">Add New Post</h1>
        <div className="form-container__wrapper">
          <form className="form-container__form form" onSubmit={handleSubmit}>
            <div className="form-item">
              <label htmlFor="title" className="form-item__label">
                Title
              </label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="form-item">
              <label htmlFor="price" className="form-item__label">
                Price
              </label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="form-item">
              <label htmlFor="address" className="form-item__label">
                Address
              </label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="form-item description">
              <label htmlFor="desc" className="form-item__label">
                Description
              </label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="form-item">
              <label htmlFor="city" className="form-item__label">
                City
              </label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="form-item">
              <label htmlFor="bedroom" className="form-item__label">
                Bedroom Number
              </label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="form-item">
              <label htmlFor="bathroom" className="form-item__label">
                Bathroom Number
              </label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="form-item">
              <label htmlFor="latitude" className="form-item__label">
                Latitude
              </label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="form-item">
              <label htmlFor="longitude" className="form-item__label">
                Longitude
              </label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="form-item">
              <label htmlFor="type" className="form-item__label">
                Type
              </label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="type" className="form-item__label">
                Property
              </label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="form-item">
              <label htmlFor="utilities" className="form-item__label">
                Utilities Policy
              </label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="pet" className="form-item__label">
                Pet Policy
              </label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="income" className="form-item__label">
                Income Policy
              </label>
              <input id="income" name="income" type="text" placeholder="Income Policy" />
            </div>
            <div className="form-item">
              <label htmlFor="size" className="form-item__label">
                Total Size (sqft)
              </label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="form-item">
              <label htmlFor="school" className="form-item__label">
                School
              </label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="form-item">
              <label htmlFor="bus" className="form-item__label">
                bus
              </label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="form-item">
              <label htmlFor="restaurant" className="form-item__label">
                Restaurant
              </label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="form-button">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="new-post-page__side side">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <Uploadwidget
          uwConfig={{
            cloudName: 'duld43v1i',
            uploadPreset: 'booking',
            multiple: false,
            maxImageFileSize: 200000,
            folder: 'avatars',
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
