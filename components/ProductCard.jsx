import React from "react";

const ProductCard = ({ productItem, onDelete, onEdit }) => {
  const handleDeleteClick = () => {
    onDelete(productItem.title);
  };
  const handleEditClick = () => {
    onEdit(productItem);
  };
  return (
    <div
      className="bg-slate-100 flex flex-col 
    rounded-lg shadow-lg hover:scale-105 
    hover:shadow-xl hover:bg-slate-200 
    transition-all duration-200 ease-out"
    >
      <img
        src={productItem.image || "image not defined"}
        alt={productItem.title}
        className="h-56 
        w-full object-cover rounded-t-lg shadow-md italic text-sm"
      />
      <button
        className="absolute end-12 top-4 z-10 rounded-full bg-orange-200 p-2 text-orange-500 transition hover:text-sec hover:bg-orange-500 hover:text-orange-200 mr-2"
        onClick={handleEditClick}
      >
        <span className="sr-only">Edit</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fullRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
      <button
        className="absolute end-4 top-4 z-10 rounded-full bg-red-200 p-2 text-red-500 transition hover:text-sec hover:bg-red-500 hover:text-red-200"
        onClick={handleDeleteClick}
      >
        <span className="sr-only">Delete</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
        </svg>
      </button>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <div className="flex mb-2 gap-2">
            <h2 className="text-sm border border-orange-400 text-orange-400 px-2 py-0.5 w-fit rounded-full">
            ★ {productItem.rating && productItem.rating.rate || "0"}
            </h2>
            <h2 className="border border-orange-400 text-orange-400 px-2 py-0.5 w-fit rounded-full">
              $ {productItem.price}
            </h2>
          </div>
          <h2 className="font-bold">{productItem.title}</h2>
          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-6">{productItem.description}</p>
          </section>
          <footer
            className="text-xs text-right 
          ml-auto flex space-x-1 pt-5 italic text-gray-400"
          >
            <p className="capitalize">{productItem.category || "0"} -</p>
            <p>{productItem.rating && productItem.rating.count || "0"} selled</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
