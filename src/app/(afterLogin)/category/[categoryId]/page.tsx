import BackButton from '../../_components/BackButton';
import { Test } from '../_components/Test';

type Params = {
  params: {
    categoryId: string;
  };
};

export default function Page({ params }: Params) {
  const { categoryId } = params;

  console.log(categoryId);

  return (
    <div className="h-screen">
      <BackButton />
      <div className="text-lg font-medium text-center mt-12 mb-24">
        {categoryId}
      </div>
      <div className="w-full flex justify-center items-center mb-8">
        <div className="h-48 w-48 bg-[#D9D9D9] rounded-full"></div>
      </div>
      <div className="text-center text-sm font-normal mb-10">
        <h6>안녕하세요</h6>
        <h6>무엇을 도와드릴까요?</h6>
      </div>
      <Test />
      {/* daf 테스트 안에서 텍스트 전부 보여주기 테스트는 통신 컴포넌트 & 결과 확인 컴포넌트가 같이 있는 방향으로  */}
    </div>
  );
}
