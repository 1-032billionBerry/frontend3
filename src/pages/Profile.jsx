import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo, getUserPosts } from '../http';
import Cookies from 'js-cookie';

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('auth_token');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${username} - Профіль`;

    const fetchData = async () => {
      try {
        const userInfoData = await getUserInfo(username);
        const userPostsData = await getUserPosts(username, token);
        setUserInfo(userInfoData);
        setUserPosts(userPostsData);
      } catch (error) {
        setError('Неможливо завантажeння даних');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, token]);

  if (isLoading) {
    return <div className="text-center mt-5">Завантаження...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="profile-header text-center mb-4">
          <h1>{userInfo?.full_name || username}</h1>
        </div>

        {error ? (
          <div className="alert alert-danger">Такого користувача не існує</div>
        ) : (
          <div className="profile-posts">
            <h2>Пости користувача</h2>
            {userPosts.length > 0 ? (
              <div className="row g-4">
                {userPosts.map((post) => (
                  <div key={post.id} className="col-md-4">
                    <div
                      onClick={() => navigate(`/post/${post.author.username}/${post.id}`)}
                      className="card clickable h-100">
                      <div className="card-body">
                        <h5 className="card-title">{post.author.full_name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">@{post.author.username}</h6>
                        <p className="card-text">{post.content}</p>
                      </div>
                      <div className="card-footer text-muted d-flex justify-content-between">
                        <span>{post.likes} Likes</span>
                        <span>{post.is_liked ? 'You liked this' : "You haven't liked this"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3">У користувача немає постів.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
