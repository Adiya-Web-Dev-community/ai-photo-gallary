import { useEffect, useState } from "react";

const AllImagesContainer = ({
  eventData,
  setOpenImagesCorousalModal,
  imageIndex,
  setSelectedImage,
  paginationData,
  setPageNo,
}) => {
  console.log(paginationData);

  const handleImagesOnClick = (idx) => {
    setOpenImagesCorousalModal(true);
    setSelectedImage(idx);
  };

  return (
    <div className="px-2">
      {/* image list */}
      <div className=" h-[23rem] grid grid-cols-4  gap-4 justify-center items-center space-y-2">
        {eventData?.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt="image"
            className="w-[14rem] h-[10rem]"
            onClick={() => handleImagesOnClick(idx)}
          />
        ))}
      </div>
      {/* pagination buttons */}
      <div className="flex justify-center items-center py-10">
        <div className="flex justify-cenetr items-center gap-3">
          {[...Array(paginationData?.totalPages)].map((_, i) => {
            return (
              <p
                onClick={() => setPageNo(i + 1)}
                key={i}
                className="bg-gray-300 pt-[3px] w-[2rem] h-[2rem] rounded-md text-center cursor-pointer hover:bg-gray-700 hover:text-white"
              >
                {i + 1}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllImagesContainer;
