import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from '../axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = Cookies.get('auth_token');
  const { username } = useParams();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `/users/${username}/posts`,
        { content },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );
      navigate(`/profile/${username}`);
    } catch (err) {
      setError('Помилка при створенні посту.');
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4">Створити пост</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Введіть текст поста..."
              rows="6"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!content}>
            Опублікувати
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
