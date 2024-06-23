const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul className="top-menu">
        <li>
          <i class="xi-home" />
          메인 화면으로
        </li>
        <li>
          <i class="xi-cog" />
          설정
        </li>
      </ul>
      <div className="divider"></div>
      <div className="menu-section">
        <h3>메뉴</h3>
        <h4>이지혜의 이력서</h4>
        <ul className="resume-menu">
          <li>
            <i class="xi-angle-right-min" /> 프로필
          </li>
          <li>
            <i class="xi-angle-right-min" /> 교육
          </li>
          <li>
            <i class="xi-angle-right-min" /> 경력
          </li>
          <li>
            <i class="xi-angle-right-min" /> 프로젝트
          </li>
          <li>
            <i class="xi-angle-right-min" /> 경험
          </li>
          <li>
            <i class="xi-angle-right-min" /> 스킬
          </li>
          <li>
            <i class="xi-angle-right-min" /> 링크
          </li>
        </ul>
      </div>
    </nav>
  </aside>
);

export default Sidebar;
