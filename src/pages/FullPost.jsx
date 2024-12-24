import React from 'react';
import { fetchPost } from '../http';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';

function FullPost() {
  const { username, post_id } = useParams();

  const [post, setPost] = React.useState(null);
  const [isLiking, setIsLiking] = React.useState(false);
  const token = Cookies.get('auth_token');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPost(username, token, post_id);
        setPost(response);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [username, post_id, token]);

  const toggleLike = async () => {
    setIsLiking(true);
    const url = `/users/${username}/posts/${post_id}/like`;

    try {
      if (post.is_liked) {
        // Remove like
        await axios.delete(url, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPost((prev) => ({ ...prev, is_liked: false, likes: prev.likes - 1 }));
      } else {
        // Add like
        await axios.put(
          url,
          {},
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          },
        );
        setPost((prev) => ({ ...prev, is_liked: true, likes: prev.likes + 1 }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (!post) {
    return <div className="text-center mt-5">Завантаження...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h1 className="card-title text-center">{post.content}</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="card-subtitle text-muted">
                  Автор: {post.author.full_name} (@{post.author.username})
                </h5>
              </div>
              <div>
                <button
                  className={`btn btn-${post.is_liked ? 'danger' : 'primary'} btn-sm`}
                  onClick={toggleLike}
                  disabled={isLiking}>
                  {post.is_liked ? 'Unlike' : 'Like'} ({post.likes})
                </button>
              </div>
            </div>
            <p className="card-text text-center text-muted">
              Пост створено: {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullPost;
