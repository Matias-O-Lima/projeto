import Link from "next/link";

interface IProps {
  data: {
    isActive: boolean;
    title: string;
    pathname: string;
  }[];
}
export default function Tabs({ data }: IProps) {
  const getClass = (isActive: boolean) => {
    if (isActive) {
      return "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";
    }
    return "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  };
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {data.map((res, i) => {
            return (
              <li key={i} className="me-2">
                <Link href={res.pathname} className={getClass(res.isActive)}>
                  {res.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
