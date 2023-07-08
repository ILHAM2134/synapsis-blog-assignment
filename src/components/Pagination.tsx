import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type PaginationProps = {
  pagData: {}[][];
  setPagNum: React.Dispatch<React.SetStateAction<number>>;
  displayPag: boolean;
};

const Pagination = ({ pagData, setPagNum, displayPag }: PaginationProps) => {
  const [current, setCurrent] = useState(0);
  const [recent, setRecent] = useState(0);

  const pag = pagData.length;
  let arr = [];
  for (let x = 0; x < pag; x++) {
    arr.push(x);
  }

  const handleClick = (item: number) => {
    setPagNum(item);
    setRecent(item);
    setCurrent(item);
  };

  const previousClick = () => {
    if (recent != 0) {
      setPagNum(recent - 1);
      setRecent(recent - 1);
      setCurrent(recent - 1);
    }
  };

  const nextClick = () => {
    if (recent < pag - 1) {
      setPagNum(recent + 1);
      setRecent(recent + 1);
      setCurrent(recent + 1);
    }
  };

  const currentClass =
    "cursor-pointer relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20";

  const otherClass =
    "cursor-pointer relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20";

  return (
    <div
      className={
        displayPag
          ? "flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
          : "hidden"
      }
    >
      <div className="flex flex-1 justify-between md:hidden">
        <div
          onClick={previousClick}
          className="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={nextClick}
          className="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden md:flex md:flex-1 md:items-center justify-center">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <div
            onClick={previousClick}
            className="cursor-pointer relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </div>

          {arr.map((item) => (
            <div
              key={item}
              className={current == item ? currentClass : otherClass}
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
          <div
            onClick={nextClick}
            className="cursor-pointer relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
