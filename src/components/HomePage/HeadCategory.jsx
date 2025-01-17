import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineClose, AiOutlineDoubleRight } from "react-icons/ai";

const HeadCategory = () => {
  const [cate, setNav] = useState(true);
  const handleNav = () => {
    setNav(!cate);
  };

  const [head, setHead] = useState([]);
  const getHead = async () => {
    const head = await getDocs(collection(db, "HeadCategory"));
    const allHead = head.docs.map((val) => ({ ...val.data(), id: val.id }));
    setHead(allHead);
  };
  useEffect(() => {
    getHead();
  }, []);

  return (
    <section>
      <div className="flex w-[100%] bg-gray-200 py-2">
        <div className="flex w-[100%] hover:duration-200 max-lg:hidden justify-evenly">
          {/* desktop mode */}
          <div className="uppercase">
            <ul className="flex hover:text-gray-300 flex hover:scale-110">
              <Link
                to={"/allGen"}
                className="border-double border-4 border-[#AAACA6] whitespace-nowrap bg-white rounded-2xl shadow-xl px-1 py-1 text-gray-500 font-bold lg:text-3xl hover:text-cyan-700 "
              >
                <h1 className="xl:text-3xl lg:text-2xl">All Category</h1>
              </Link>
            </ul>
          </div>
          <div className="flex">
            <ul className="space-x-3 w-fit items-center mt-2 uppercase">
              <Link
                to={"/bacII"}
                className="border-double border-4 border-[#AAACA6] text-xl hover:shadow-xl px-2 py-2 hover:scale-110 rounded-2xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                BacII Exam
              </Link>
              <Link
                to={"/comdy"}
                className="border-double border-4 border-[#AAACA6] text-xl hover:shadow-xl px-2 py-2 hover:scale-110 rounded-2xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                Comdy
              </Link>
              <Link
                to={"/comic"}
                className="border-double border-4 border-[#AAACA6] text-xl hover:shadow-xl px-2 py-2 hover:scale-110 rounded-2xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                Comic Books
              </Link>
              <Link
                to={"/novel"}
                className="border-double border-4 border-[#AAACA6] text-xl hover:shadow-xl px-2 py-2 hover:scale-110 rounded-2xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                Novel Books
              </Link>
              <Link
                to={"/study"}
                className="border-double border-4 border-[#AAACA6] text-xl hover:shadow-xl px-2 py-2 hover:scale-110 rounded-2xl hover:text-cyan-700 whitespace-nowrap text-gray-500 font-bold bg-white shadow-md"
              >
                Learning Book
              </Link>
            </ul>
          </div>
        </div>

        {/* Mobile Mode */}

        <div className="flex md:w-full max-sm:w-100% h-fit lg:hidden ">
          <div onClick={handleNav} className="md:block lg:hidden relative m-2 items-center flex">
            {cate ? (
              <AiOutlineDoubleRight size={30} className="relative items-center " />
            ) : (
              <AiOutlineClose size={30} className="relative items-center " />
            )}
          </div>
          <div
            className={
              cate
                ? "fixed left-[100%] "
                : "fixed left-[5%] md:flex whitespace-nowrap duration-300 relative \
                md:w-[80%] md:justify-between sm:w-[80%] max-sm:w-[80%]"
            }
          >
            <ul className="flex font-bold lg:hidden max-sm:w-fit ">
              <Link to={"/allGen"} className="text-2xl hover:text-cyan-800 text-gray-500 ">
                All Category &nbsp;
              </Link>
            </ul>
            <ul className="mt-1 space-x-3 max-sm:w-fit max-sm:flex max-sm:flex-wrap relative">
              <Link
                to={"/bacII"}
                className="sm:text-sm md:text-md sm:text-sm xs:text-sm rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                BacII Exam
              </Link>
              <Link
                to={"/comdy"}
                className=" md:text-md sm:text-sm xs:text-sm  hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Comdy
              </Link>
              <Link
                to={"/comic"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Comic Books
              </Link>
              <Link
                to={"/novel"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Novel Books
              </Link>
              <Link
                to={"/study"}
                className=" md:text-md sm:text-sm xs:text-sm hover:shadow-full hover:scale-110 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                Learning Book
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadCategory;
