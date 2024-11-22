// app/components/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      {/* 로딩 애니메이션 */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-bold text-red-600">
          결제 진행 중입니다.
        </p>
        <p className="text-gray-600">
          결제 완료까지 다소 시간이 걸릴 수 있습니다.
        </p>
      </div>
    </div>
  );
}
