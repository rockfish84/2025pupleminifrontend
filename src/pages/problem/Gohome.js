import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import GohomeImage from "../../assets/gohome.png"; // 이미지 경로 설정

const Gohome = () => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(atob(storedToken.split(".")[1]));
    if (user.currentProblemId < 7) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("로그인이 필요합니다.");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/problem/submit`,
        { answer, problemId: 7, userId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📩 서버 응답:", response.data);

      if (response.data.isCorrect === true) {

        const updateResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/update-problem`,
          { userId }
        );

        if (updateResponse.data.token) {
          localStorage.setItem("token", updateResponse.data.token);
        }

        setTimeout(() => {
          navigate("/problem/timerun");
        }, 100);
      } else {
        setMessage("정답이 틀렸습니다.");
      }
    } catch (error) {
      console.error("🚨 서버 오류:", error);
      setMessage(error.response?.data?.message || "서버 오류 발생");
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center" style={{ marginTop: "2rem" }}>
        
        {/* 스토리 부분: 회색 박스 + 큰 글씨 + 여백 */}
        <div
          className="bg-gray-200 text-xl p-4 mb-6"
          style={{ maxWidth: "600px", marginTop: "3rem" }}
        >
          <p>
            좋아요, 이 정도면 Puple 부원이 될 자격이 충분한 것 같군요.
            <br />
            퍼플이를 KAIST Puple의 부원으로 인정해드리죠.
            <br />
            이제 집에 돌아가시면 됩니다. 어떻게 돌아가냐고요?
            <br />
            글쎄요…?
          </p>
        </div>
        <br /><br /><br />

        {/* 문제 제목 */}
        <h2 className="text-3xl font-bold my-6">집에 가는 길</h2>
   
        {/* 문제 내용 */}
        <div className="text-gray-700 my-6 text-xl">
        <p>우주 최강 퍼플 동아리 KAIST PUPLE에는 많은 별들이 있단다.</p>
          <p>그 중 가장 큰 별 5개가 보이니?</p>
          <p>안 보인다고?</p>
          <p>그럼 더 넓게 보는 게 어떤가?</p>
        </div>
        <br/>
        <br/>

        {/* 문제 이미지 */}
        <div className="my-4 w-full flex justify-center">
          <img
            src={GohomeImage}
            alt="집에 가는 길 문제 이미지"
            className="responsive-img max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
        <br/>
        <br/>

        {/* 정답 입력 폼 */}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 rounded-md"
            placeholder="정답을 입력하세요"
          />
          <button
            type="submit"
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md"
          >
            제출
          </button>
        </form>

        {/* 메시지 표시 */}
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
      <br />
      <br />
      <br />
    </PageLayout>
  );
};

export default Gohome;
