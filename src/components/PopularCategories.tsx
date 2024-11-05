// 더미 데이터
const categories = ["치킨", "엽떡", "족발", "사과", "김밥"];

const PopularCategories = () => {
  return (
    <div className="flex p-4 space-x-4 overflow-x-auto">
      {categories.map((category) => (
        <div
          key={category}
          className="bg-gray-200 rounded p-2 px-4 text-center transition duration-200 ease-in-out hover:bg-gray-300 hover:text-gray-800"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default PopularCategories;
