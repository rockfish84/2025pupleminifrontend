import PageLayout from "../components/PageLayout";

const Announcement = () => {
  return (
    <PageLayout>
      <div className="text-center">
      <br />
      <br />
        <h2 className="text-3xl font-bold my-6">공지사항</h2>
        <p className="text-gray-700">
          2/23: 25 새내기가 아닌 분들도 명예의 전당에 등록될 수 있도록 수정하였습니다.<br/>
        </p>
      </div>
    </PageLayout>
  );
};

export default Announcement;
