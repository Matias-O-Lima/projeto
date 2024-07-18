import { Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  url: string;
  id: string;
}

export function CardCourse({ url, id }: Props) {
  const { push } = useRouter();
  return (
    <div
      onClick={() => {
        push(`/dashboard/course/${id}`);
      }}
      className="relative group overflow-hidden rounded border border-[#16161e]"
    >
      <article className="flex items-center justify-center max-w-[220px] max-h-[450px]  transition duration-300 ease-in-out rounded cursor-pointer shadow">
        <img
          src={url}
          alt=""
          className="w-full h-full object-cover rounded transition duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-50"
        />
      </article>
      <div className="absolute p-5 w-full bottom-0 transition-all duration-300 ease-in-out transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ">
        <button className="flex gap-1 w-full items-center justify-center mb-4 px-4 py-2 bg-white text-black text-sm font-medium rounded">
          <Play size={15} /> Assistir aulas
        </button>
      </div>
    </div>
  );
}
