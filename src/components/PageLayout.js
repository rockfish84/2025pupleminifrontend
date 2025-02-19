import { useEffect } from "react";

const PageLayout = ({ children }) => {
  useEffect(() => {
    document.title = "25 퍼플 동박 미궁"; // 제목 변경

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "25 새내기들을 위한 퍼플 미니 미궁";
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return <>{children}</>;
};

export default PageLayout;
