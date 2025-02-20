import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      setUser(!!localStorage.getItem("token"));
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <nav className="bg-gray-100 shadow-md w-full relative">
      <div className="flex items-center justify-between p-4 px-8">
        {/* 🔥 왼쪽: 로고 */}
        <Link to="/" className="text-2xl font-extrabold text-purple-700 hover:text-purple-500">
          2025 동박 미니 미궁
        </Link>

        {/* 📌 중앙: 메뉴 (화면 기준 중앙) */}
        <div className="hidden md:flex gap-12 text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-gray-700 hover:text-purple-500">메인</Link>
          <Link to="/announcement" className="text-gray-700 hover:text-purple-500">공지사항</Link>
          <Link to="/howto" className="text-gray-700 hover:text-purple-500">진행방법</Link>
          <Link to="/history" className="text-gray-700 hover:text-purple-500">히스토리</Link>
          <Link to="/creators" className="text-gray-700 hover:text-purple-500">제작자</Link>
          <Link to="/ranking" className="text-gray-700 hover:text-purple-500">명예의 전당</Link>
        </div>

        {/* 🔥 오른쪽: 마이페이지 / 로그인 */}
        <div className="hidden md:block">
          {user ? (
            <Link to="/mypage" className="text-blue-500 hover:text-blue-700">마이페이지</Link>
          ) : (
            <Link to="/login" className="text-blue-500 hover:text-blue-700">로그인</Link>
          )}
        </div>

        {/* 📌 모바일 햄버거 버튼 */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📌 모바일 메뉴 (햄버거 클릭 시 열림) */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-4 pb-4 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-purple-500 text-lg">메인</Link>
          <Link to="/announcement" className="text-gray-700 hover:text-purple-500 text-lg">공지사항</Link>
          <Link to="/howto" className="text-gray-700 hover:text-purple-500 text-lg">진행방법</Link>
          <Link to="/history" className="text-gray-700 hover:text-purple-500 text-lg">히스토리</Link>
          <Link to="/creators" className="text-gray-700 hover:text-purple-500 text-lg">제작자</Link>
          <Link to="/ranking" className="text-gray-700 hover:text-purple-500 text-lg">명예의 전당</Link>

          {/* 🔥 마이페이지 / 로그인 (모바일) */}
          {user ? (
            <Link to="/mypage" className="text-blue-500 hover:text-blue-700 text-lg">마이페이지</Link>
          ) : (
            <Link to="/login" className="text-blue-500 hover:text-blue-700 text-lg">로그인</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
