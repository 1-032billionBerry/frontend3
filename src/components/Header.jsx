import React from 'react';
import { AiOutlineUser, AiFillEdit } from 'react-icons/ai';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMe } from '../http';

function Header() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('auth_token');
        const response = await fetchMe(token);
        setUser(response);
      } catch (err) {
        setError('Невдалося завантажити дані');
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const token = Cookies.get('auth_token');

  const logout = () => {
    Cookies.remove('auth_token');
    navigate('/login');
  };

  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="h3 d-flex align-items-center">
            <AiFillEdit className="me-2" /> KPI-tter
          </h1>
        </Link>
        <div>
          {token ? (
            <div className="d-flex align-items-center">
              <Link
                to={`/profile/${user?.username}`}
                className="text-white text-decoration-none me-3 d-flex align-items-center">
                <AiOutlineUser className="me-2" />
                <span>{user?.username}</span>
              </Link>
              <Link to={`/create-post/${user?.username}`} className="btn btn-light btn-sm me-3">
                <AiFillEdit className="me-1" /> Створити пост
              </Link>
              <button onClick={logout} className="btn btn-danger btn-sm">
                <BiLogOut className="me-1" /> Вийти
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="btn btn-light btn-sm">
              <BiLogIn className="me-1" /> Увійти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
