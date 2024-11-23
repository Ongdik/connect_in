import Link from "next/link";

function HomeButton() {
  return (
    <Link href="/" passHref>
      <button className="bg-blue-500 text-white py-2 px-10 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ">
        홈으로
      </button>
    </Link>
  );
}

export default HomeButton;