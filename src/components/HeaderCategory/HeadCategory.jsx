import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const HeadCategory = () => {
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
      <div className="bg-gray-200 border-gray-200 shadow-lg z-10">
          <div className="py-0.5 flex justify-evenly space-x-10  lg:ml-32 md:ml-12 sm:ml-12 xs:ml-12 ">
            {head.map((link) => (
              <ul>
                <Link to={link.Url} className="">
                  <span className="w-full text-lg font-bold uppercase">{link.header}</span>
                </Link>
              </ul>
            ))}
          </div>
      </div>
    </section>
  );
};

export default HeadCategory;
