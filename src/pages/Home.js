import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import HomeImage from "../assets/homepage.png";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1])); // JWT 디코딩

        if (!decodedToken?.userId) {
          console.error("🚨 userId가 없음");
          return;
        }

        setUser(decodedToken); // 기본 정보 저장

        // 사용자 정보 가져와 currentProblemId 업데이트
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/${decodedToken.userId}`)
          .then((res) => {
            setUser((prev) => ({
              ...prev,
              currentProblemId: res.data.currentProblemId,
            }));
          })
          .catch((error) => {
            console.error("🚨 사용자 정보 로드 오류:", error);
          });
      } catch (error) {
        console.error("🚨 JWT 파싱 오류:", error);
      }
    }
  }, []);

  const handleStartGame = () => {
    if (!user) {
      console.warn("🔒 로그인 필요: 로그인 페이지로 이동");
      navigate("/login");
      return;
    }

    const problemRoutes = {
      1: "/problem/example",
      2: "/problem/even",
      3: "/problem/littlebiggerstar",
      4: "/problem/recruting",
      5: "/problem/wellseen",
      6: "/problem/introduce",
      7: "/problem/gohome",
      8: "/problem/timerun",
      9: "/clear"
    };

    navigate(problemRoutes[user.currentProblemId] || "/problem/clear");
  };

  return (
    <PageLayout>
      {/* 두 번째 이미지 (확대 1.7배 예시) */}
      <br />
      <br />
      <div className="my-4 w-full flex justify-center">
        <img
        src={HomeImage}
        alt="복면산 문제 풀이 예시 이미지"
        className="responsive-img max-w-xs md:max-w-sm lg:max-w-md"
        />
      </div>
      <div className="text-center">
        <p className="text-gray-700 my-6">
        <br />
        <br />
          ‘2025 퍼플 동박 미궁’에 오신 여러분을 환영합니다!<br />
          ‘2025 퍼플 동박 미궁’은 KAIST Puple이 제작한 미궁 게임으로,<br />
          주어진 문제들을 해결하고 넘어가는 형식으로 되어 있습니다.<br />
          스토리와 문제를 포함한 모든 요소는 KAIST Puple에서 직접 제작되었습니다.<br />
        </p>

        <p className="text-gray-700 my-6">
          공개된 장소에서의 직접적인 힌트 제공 및 문제 스포일러를 삼가주시고,<br />
          정보 공유를 하더라도 쪽지 등 다른 사람이 알 수 없는 개인적인 방법을 이용해주시기 바랍니다.<br />
          또한, 미궁을 다른 사람들과 같이 풀었을 경우 꼭 팀 단위로 명예의 전당에 등록해주세요.<br />
        </p>
        <br /><br /><br />

        <h3 className="text-3xl font-bold text-purple-700 my-4">미궁 클리어 이벤트 안내</h3>
        <p className="text-gray-700 mb-6">
        <br />
          많은 분들이 즐기실 수 있도록 많은 상품을 준비해놓았습니다!<br />
          엔딩 클리어: <br />
          1등 - 배민 3만원 쿠폰<br/>
          2등 - 배민 1만원 쿠폰<br/> 
          3등 - GS25 5천원 기프티콘<br />
          4등 ~ 10등 - 바나나우유 기프티콘<br/>
          이외에도 미궁을 클리어하신 모든 분들은 명예의 전당에 등재됩니다!<br />
          이벤트 참여 및 명예의 전당 등재를 원하시는 분은<br />
          <strong>kaistpuple@gmail.com</strong> 으로<br />
          히스토리 사진, 클리어 화면을 본인의 이름, 카이스트 메일, 아이디와 함께 보내주세요. <br />
          원하시는 경우 미리 요청해주시면 본인의 이름을 같이 남겨드리도록 하겠습니다. <br />
        </p>

        <button
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md"
          onClick={handleStartGame}
        >
          미궁 시작하기
        </button>
      </div>
      <br />
      <br />
      <br />
    </PageLayout>
  );
};

export default Home;
