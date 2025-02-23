import PageLayout from "../components/PageLayout";

const Ranking = () => {
  return (
    <PageLayout>
      <div className="text-center">
      <br />
      <br />
        <h2 className="text-3xl font-bold my-6">명예의 전당</h2>
        <p className="text-gray-700">
          축하합니다! 게임을 클리어한 유저들의 순위입니다. <br/>
          <br/>
          <h3 className="text-2xl font-bold mt-6">1위: yuchantony(오유찬)<br/></h3>
         <br/>
         <h3 className="text-2xl font-bold mt-6"> 2위: WolfB<br/></h3>
         <br/>
          퍼플은내가접수한다.<br/>
          <br/>

          - 3위: TBD <br/>
        </p>
      </div>
      <br />
      <br />
      <br />
    </PageLayout>
  );
};

export default Ranking;
