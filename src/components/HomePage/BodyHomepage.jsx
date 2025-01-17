import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../../App.css";
import {
  BiChevronLeftCircle,
  BiChevronRightCircle,
  BiXCircle,
  BiBookmarkPlus,
  BiBookReader,
  BiSolidCartAdd,
} from "react-icons/bi";

const BodyHomepage = () => {
  const [Book, setBook] = useState([]);
  const [BookData, setBookData] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [detailIndex, setDetailIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [readBook, setReadBook] = useState(false);

  const slideNext = () => {
    const lastIndex = BookData.length - 1;
    setCurrentData((prevIndex) => (prevIndex === lastIndex ? prevIndex : (prevIndex + 1) % BookData.length));
  };

  const slidePrev = () => {
    setCurrentData((prevIndex) =>
      prevIndex === 0 ? prevIndex : (prevIndex - 1 + BookData.length) % BookData.length
    );
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const closeBook = () => {
    setReadBook(false);
  };

  const handleSeeMoreClick = (index) => {
    setDetailIndex(index);
    setOpenModal(true);
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const contain = collection(db, "PopularSection");
        const snapshot = await getDocs(contain);
        const data = snapshot.docs.map((val) => ({ ...val.data(), id: val.id }));
        setBook(data);

        const bookDataPromises = data.map(async (elem) => {
          try {
            const BookPop = collection(db, `PopularSection/${elem.id}/BookPopular`);
            const DataBooks = await getDocs(BookPop);
            const BookData = DataBooks.docs.map((bookDoc) => ({
              ...bookDoc.data(),
              id: bookDoc.id,
            }));
            return BookData;
          } catch (error) {
            console.error(`Error fetching book data for ${elem.id}:`, error);
            return null;
          }
        });

        const bookData = await Promise.all(bookDataPromises);
        setBookData(bookData.flat());
      } catch (error) {
        console.error("Error fetching popular section data:", error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      <section>
        {Book.map((data, i) => (
          <button key={i}>
            <div className="" key={i}>
              {data.container && (
                <h1 className="text-4xl px-10 uppercase font-bold flex lg:py-3 hover:text-cyan-800 rounded-xl">
                  {data.container}
                </h1>
              )}
            </div>
          </button>
        ))}
        <div className=" flex items-center justify-center bg-gray-100  z-10">
          <div className="w-full flex items-center justify-between px-2 relative">
            <button
              onClick={() => slidePrev()}
              className={`flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262] ${
                currentData === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentData === 0}
            >
              <BiChevronLeftCircle className="text-cyan-700 text-3xl lg:m-1 " />
            </button>

            <div className="flex gap-x-8 w-full overflow-hidden p-3 ">
              {BookData.slice(
                currentData,
                currentData + (window.innerWidth < 450 ? 1 : window.innerWidth < 800 ? 2 : 3)
              ).map((data, i) => (
                <div key={i} className="hover:shadow-xl">
                  <div className="flex rounded-xl bg-white shadow-xl overflow-hidden  duration-300">
                    {data.ImageBook && (
                      <img
                        onClick={(e) => {
                          handleSeeMoreClick(currentData + i);
                        }}
                        src={data.ImageBook}
                        alt="image-book"
                        className="flex lg:w-[200px] lg:h-[250px] xl:w-[250px] xl:h-[300px] max-lg:w-[150px] max-lg:h-[200px] max-sm:w-[150px] max-sm:h-[180px] shadow-lg"
                      />
                    )}
                    <div className="flex flex-col text-left lg:w-[170px] lg:h-full xl:w-[200px] max-lg:w-[150px] max-sm:w-[120px] overflow-hidden">
                      {data.title && (
                        <h1 className="flex book-title font-bold lg:text-2xl max-sm:text-sm whitespace-nowrap justify-center m-2 ">
                          {data.title}
                        </h1>
                      )}

                      {data.decs && (
                        <p className="indent-3 line-clamp-2 overflow-hidden max-sm:text-xs">{data.decs}</p>
                      )}
                      <div className="w-full flex items-center justify-center lg:mt-5 max-md:mt-3 max-sm:p-4">
                        <button
                          className="flex whitespace-nowrap ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
                          onClick={(e) => {
                            handleSeeMoreClick(currentData + i);
                          }}
                        >
                          See More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => slideNext()}
              className={`flex rounded-2xl items-center bg-white hover:shadow-xl border-2 border-[#626262] ${
                currentData === BookData.length - 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentData === BookData.length - 1}
            >
              <BiChevronRightCircle className="text-cyan-700 text-3xl lg:m-1 " />
            </button>
          </div>
        </div>
      </section>
      {/* Modal book */}
      {openModal && !readBook && (
        <div className="fixed inset-0 transition-opacity z-40 overflow-y-auto h-screen">
          <div className="w-full h-full items-center overflow-h-auto justify-center lg:translate-y-8 max-sm:translate-y-40">
            <div className="lg:w-[full] lg:h-[90%] md:w-[90%] md:h-[90%] md:h-[90%] md:w-[90%] max-md:w-[90%] max-sm:h-fit max-sm:w-[95%] bg-white shadow-lg rounded-2xl mx-auto relative md:translate-y-12 max-md:translate-y-12 sm:translate-y-12 max-sm:-translate-y-28">
              <div className="max-sm:flex max-sm:flex-col w-[100%] lg:h-[60%] md:h-[70%] max-md:h-[50%] max-sm:h-[70%] max-sm:w-full">
                {BookData.filter((data, index) => index === detailIndex).map((data, i) => (
                  <div
                    key={i}
                    className="lg:flex lg:h-[100%] md:h-[100%] max-sm:w-[100%] max-sm:h-[70%] relative "
                  >
                    {data.ImageBook && (
                      <div className="bg-no-repeat bg-left flex lg:justify-center max-sm:justify-center md:justify-center lg:w-[50%] lg:h-[100%] max-sm:w-[100%] md:h-[60%] md:w-[100%] max-md:h-[50%] max-md:w-[100%] max-sm:h-[80%] lg:p-5 max-sm:p-2">
                        <img
                          src={data.ImageBook}
                          alt="img-book"
                          className="lg:w-[80%] lg:h-[100%] md:h-[100%] md:w-[90%] max-md:w-[100%] max-sm:h-[100%] max-sm:w-[90%] rounded-md shadow-xl lg:items-center hover:scale-90 hover:duration-200"
                        />
                      </div>
                    )}
                    <button className="absolute top-0 right-0 lg:p-4 max-sm:-translate-x-2">
                      <BiXCircle
                        className="text-[40px] max-sm:text-[30px] text-gray-500"
                        onClick={closeModal}
                      />
                    </button>

                    <div className="lg:w-[50%] md:indent-8 md:w-[100%] max-md:w-[100%] md:p-2 max-sm:p-2 max-sm:w-[95%] overflow-hidden ">
                      {data.title && (
                        <h1 className="flex book-title font-bold text-gray-700 lg:text-5xl md:text-5xl lg:translate-y-12 max-sm:text-3xl whitespace-nowrap justify-center">
                          {data.title}
                        </h1>
                      )}
                      {data.author && (
                        <h1 className="hover:text-cyan-800 flex book-decs font-bold text-gray-500 lg:text-xl lg:translate-y-12 mt-1 md:text-lg max-sm:text-sm whitespace-nowrap max-sm:ml-2">
                          Author By : {data.author}
                        </h1>
                      )}

                      {data.decs && (
                        <p className="lg:text-xl lg:mt-12 md:text-xl max-sm:text-sm max-h-[200px] overflow-y-auto">
                          {data.decs}
                        </p>
                      )}
                      <div className="flex flex-col ">
                        {data.price && (
                          <div className="flex w-fit book-decs md:m-3 max-sm:m-3">
                            <h1 className="whitespace-nowrap flex lg:text-4xl md:text-3xl max-md:text-2xl max-sm:text-3xl hover:underline">
                              Price :
                            </h1>
                            <h2 className="whitespace-nowrap flex font-bold text-red-800 lg:text-5xl md:text-4xl max-md:text-4xl max-sm:text-4xl ml-5">
                              {data.price}
                            </h2>
                          </div>
                        )}

                        <div className="lg:gap-x-2 flex lg:mt-3 md:gap-x-5 max-md:gap-x-5 max-sm:gap-x-1 text-xl justify-center max-sm:text-md">
                          <button
                            className="gap-x-1 lg:p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center text-white whitespace-nowrap hover:bg-gray-800"
                            onClick={() => this}
                          >
                            <BiBookmarkPlus className="lg:text-2xl md:text-3xl " />
                            Add to Playlist
                          </button>
                          <button
                            onClick={(e) => {
                              setReadBook(true);
                            }}
                            className="gap-x-1 p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800"
                          >
                            <BiBookReader className="lg:text-2xl md:text-3xl " />
                            Read Now
                          </button>
                          <button className="gap-x-1 p-1 lg:w-52 max-sm:w-32 rounded-xl bg-gray-500 flex items-center justify-center text-white text-xl whitespace-nowrap hover:bg-gray-800">
                            <BiSolidCartAdd className="lg:text-2xl md:text-3xl " />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-3xl  max-lg:mt-7 md:mt-6 px-10 uppercase font-bold flex lg:py-3 hover:text-cyan-800">
                  <h1> Recommendation </h1>
                </div>
                <div className="mt-2 flex gap-x-8 w-full overflow-hidden p-3 z-40 justify-center">
                  {BookData.slice(
                    detailIndex,
                    detailIndex + (window.innerWidth < 400 ? 1 : window.innerWidth < 800 ? 2 : 4)
                  ).map((data, i) => (
                    <div key={i} className="hover:shadow-xl ">
                      <div className="flex rounded-xl bg-gray-200 shadow-xl overflow-hidden duration-300 ">
                        {data.ImageBook && (
                          <img
                            src={data.ImageBook}
                            alt="image-book"
                            className="flex lg:w-[100px] lg:h-[150px] xl:w-[150px] xl:h-[200px] max-lg:w-[80px] max-lg:h-[100px] max-sm:w-[60px] max-sm:h-[100px]"
                          />
                        )}
                        <div className="flex flex-col text-left lg:w-[170px] lg:h-full xl:w-[200px] max-lg:w-[150px] max-sm:w-[120px] overflow-hidden">
                          {data.title && (
                            <h1 className="flex book-title font-bold lg:text-2xl max-sm:text-sm whitespace-nowrap justify-center m-2 ">
                              {data.title}
                            </h1>
                          )}
                          {data.decs && (
                            <p className="indent-3 line-clamp-2 overflow-hidden max-sm:text-xs">
                              {data.decs}
                            </p>
                          )}
                          <div className="w-full flex items-center justify-center lg:mt-5 max-md:mt-3 max-sm:p-4">
                            <button className="flex whitespace-nowrap ease-in-out decoration-300 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
                              See More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {readBook && (
        <div className="fixed inset-0 z-50 max-sm:translate-y-40 transition-opacity ">
          <div className="w-full h-full items-center justify-center">
            <div className="fixed w-[95%] h-[95%] bg-gray-100 rounded-2xl mx-auto lg:translate-y-10 max-md:translate-y-12 sm:translate-y-10 max-sm:-translate-y-28 relative z-30">
              {BookData.filter((book, index) => index === detailIndex).map((data, i) => (
                <div className="flex h-full w-full relative ">
                  {data.PdfBook ? (
                    <iframe key={i} src={data.PdfBook} alt="pdf-book" className="w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full ">
                      <p className="text-gray-600 text-5xl font-medium">Book not yet uploaded! </p>
                    </div>
                  )}
                </div>
              ))}
              <button className="absolute -top-10 right-0 p-0">
                <BiXCircle className="text-[40px] text-gray-600" onClick={closeBook} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BodyHomepage;
