import { useEffect, useRef, useState } from "react";
import { useLogout } from "../../api/hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

const Header = ({ onLoginClick }) => {
  const { auth } = useAuthContext();
  const { mutate: logout } = useLogout();
  const [isSubDropdown, setSubDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSubDropdown(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="header">
      <a className="logo" href="/">
        POFORI
      </a>

      {auth ? (
        <>
          <h1 onClick={() => setSubDropdown(!isSubDropdown)}>
            <i className="xi-user-o" />
            {auth.name}
            {/* <button onClick={handleLogoutClick}>로그아웃</button> */}
          </h1>
          {isSubDropdown && (
            <div className="sub-dropdown" ref={dropdownRef}>
              <div onClick={() => navigate(`/resume/${list?.resume_id}`)}>
                계정 관리
              </div>
              <div onClick={handleLogoutClick}>로그아웃</div>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={onLoginClick}
          style={{
            fontSize: "14px",
          }}
        >
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
