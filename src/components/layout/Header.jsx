const Header = ({ onLoginClick }) => (
  <header className="header">
    <a className="logo" href="/">
      POFORI
    </a>
    <button onClick={onLoginClick}>로그인</button>
  </header>
);

export default Header;
