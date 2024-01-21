import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import Modal from "react-modal";
import axios from "axios";

const Product = () => {
  const [search, setSearch] = useState("");
  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [productPerPage] = useState(9);
  const [filterParam] = useState("All");
  const [product, setProduct] = useState([]);
  const [originalProduct, setoriginalProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProduct, setnewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rate: "0",
    count: "0",
  });
  const [editedProduct, seteditedProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rate: "",
    count: "",
  });  

  const url = `https://fakestoreapi.com/products`;
  useEffect(() => {
    async function getProduct() {
      try {
        const product = await axios.get(url);
        setProduct(product.data);
        // console.log(product.data);
        setoriginalProduct(product.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, []);

  function paginate() {
    const startIndex = currentPage * productPerPage;
    const endIndex = startIndex + productPerPage;
    const currentProduct = product.slice(startIndex, endIndex);
    return currentProduct;
  }

  useEffect(() => {
    const searchTerm = search.toLowerCase();
    let filteredProduct;
    if (search === "" && filterParam === "All") {
      setProduct(originalProduct);
    } else {
      if (search !== "" && filterParam === "All") {
        filteredProduct = originalProduct.filter((value) => {
          return value.title.toLowerCase().match(new RegExp(searchTerm, "g"));
        });
      } else {
        filteredProduct = originalProduct.filter((value) => {
          return (
            value.category === filterParam &&
            value.title.toLowerCase().match(new RegExp(searchTerm, "g"))
          );
        });
      }
      setProduct(filteredProduct);
    }
  }, [filterParam, search, originalProduct]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(url, newProduct);
      const updatedProduct = [response.data, ...product];
      setProduct(updatedProduct);
      setoriginalProduct(updatedProduct);
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleEditProduct = async () => {
    try {
      const editedProductData = {
        title: editedProduct.title,
        price: editedProduct.price,
        description: editedProduct.description,
        category: editedProduct.category,
        image: editedProduct.image,
        rate: editedProduct.rate,
        count: editedProduct.count,
      };
  
      const response = await axios.put(
        `${url}/${selectedProduct.id}`,
        editedProductData
      );
  
      const updatedProduct = product.map((item) =>
        item.id === selectedProduct.id ? response.data : item
      );
  
      setProduct(updatedProduct);
      setoriginalProduct(updatedProduct);
      closeEditModal();
    } catch (error) {
      console.error("Error editing product:", error.message);
    }
  };
  

  const handleDelete = async (id, title) => {
    const confirmDeletion = window.confirm(
      `Apakah anda yakin menghapus produk "${title}"?`
    );

    if (confirmDeletion) {
      try {
        await axios.delete(`${url}/${id}`);
        const updatedProduct = originalProduct.filter((item) => item.id !== id);
        setProduct(updatedProduct);
        setoriginalProduct(updatedProduct);
      } catch (error) {
        console.error("Error deleting news:", error.message);
      }
    }
  };

  const isFormValid = () => {
    return (
      newProduct.title.trim() !== "" &&
      newProduct.price.trim() !== "" &&
      newProduct.description.trim() !== "" &&
      newProduct.category.trim() !== "" &&
      newProduct.image.trim() !== ""
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (productItem) => {
    setselectedProduct(productItem);
    seteditedProduct({
      title: productItem.title,
      price: productItem.price,
      description: productItem.description,
      category: productItem.category,
      image: productItem.image,
      rate: productItem.rating.rate,
      count: productItem.rating.count,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setselectedProduct(null);
  };

  useEffect(() => {
    setProduct(product);
  }, []);

  return (
    <section className="container mx-auto">
      <div className="flex flex-col mx-[10%]">
        <div>
          <form className="max-w-6xl mx-auto flex justify-between items-center px-5">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 
              rounded-sm placeholder-gray-500 
              text-gray-500 outline-none flex-1 bg-transparent
               dark:text-orange-400"
              type="text"
              placeholder="Search Product..."
            />
            <div className="text-gray-500 text-md">
              <p>{product.length} Products found</p>
            </div>
          </form>
          <div className="max-w-lg rounded overflow-hidden mx-auto mt-0"></div>
        </div>
        <button
          onClick={openModal}
          className="bg-orange-500 text-white hover:bg-orange-300 px-4 py-2 rounded-md mt-2 -mb-4 mx-10"
        >
          Add Product
        </button>
        {isLoading && (
          <div className="animated-pulse font-serif text-lg text-gray-400 text-center p-10">
            Loading Product Feed...
          </div>
        )}
        {!isLoading && product.length === 0 && (
          <div className="animated-pulse font-serif text-lg text-gray-400 text-center p-10">
            No Product Found
          </div>
        )}
        {product.length !== 0 && (
          <main
            className="grid 
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            p-10 gap-10"
          >
            {paginate().map((productItem) => (
              <ProductCard
                key={productItem.title}
                productItem={productItem}
                onDelete={handleDelete}
                onEdit={openEditModal}
              />
            ))}
          </main>
        )}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={Math.ceil(product.length / productPerPage)}
          onPageChange={(data) => {
            setCurrentPage(data.selected);
          }}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"pagination_disabled"}
          activeClassName={"pagination_active"}
          className="mx-auto text-center flex flex-row gap-4 mb-8"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Add Products</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Category</label>
            <select
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              placeholder="Choose Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose Category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Image URL</label>
            <input
              type="url"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={!isFormValid()}
            className={`${
              isFormValid()
                ? "bg-orange-500 hover:bg-orange-300"
                : "bg-gray-300"
            } text-white px-4 py-2 rounded-md mr-2`}
          >
            Add Product
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="border border-orange-500 text-orange-500 hover:bg-orange-300 hover:text-white hover:border-orange-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit News Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Products</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Title:</label>
            <input
              type="text"
              name="title"
              value={editedProduct.title}
              onChange={(e) =>
                seteditedProduct({ ...editedProduct, title: e.target.value })
              }
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={(e) =>
                seteditedProduct({ ...editedProduct, price: e.target.value })
              }
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={(e) =>
                seteditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Category</label>
            <select
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              placeholder="Choose Category"
              name="namaTipeKamar"
              value={editedProduct.category}
              onChange={(e) =>
                seteditedProduct({ ...editedProduct, category: e.target.value })
              }
              required
            >
              <option value="">Choose Category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Image URL</label>
            <input
              type="url"
              name="image"
              value={editedProduct.image}
              onChange={(e) =>
                seteditedProduct({ ...editedProduct, image: e.target.value })
              }
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Rate</label>
            <input
              type="number"
              name="rate"
              value={editedProduct.rate}
              onChange={(e) =>
                seteditedProduct({ ...editedProduct, rate: e.target.value })
              }
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Selled</label>
            <input
              type="number"
              name="count"
              value={editedProduct.count}
              onChange={(e) =>
                seteditedProduct({ ...editedProduct, count: e.target.value })
              }
              className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-orange-300"
              required
              disabled
            />
          </div>
          <button
            type="button"
            onClick={handleEditProduct}
            className="bg-orange-500 hover:bg-orange-300 text-white px-4 py-2 rounded-md mr-2"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={closeEditModal}
            className="border border-orange-500 text-orange-500 hover:bg-orange-300 hover:text-white hover:border-orange-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Product;
