import { useLogout } from "../../api/hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

const Header = ({ onLoginClick }) => {
  const { auth } = useAuthContext();
  const { mutate: logout } = useLogout();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <header className="header">
      <a className="logo" href="/">
        POFORI
      </a>

      {auth ? (
        <h1>
          {auth.name} <button onClick={handleLogoutClick}>로그아웃</button>
        </h1>
      ) : (
        <button onClick={onLoginClick}>로그인</button>
      )}
    </header>
  );
};

export default Header;
