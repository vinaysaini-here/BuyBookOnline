import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";
import assets from "../../assets/assets";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useState, useEffect } from "react";

import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
const BOOKS_DATA = [
  {
    id: 1,
    src: assets.Book1,
  },
  {
    id: 2,
    src: assets.Book2,
  },
  {
    id: 3,
    src: assets.Book3,
  },
];
const ViewBook = () => {
  const { user } = useAuthStore();
  const [selectedItem, setSelectedItem] = React.useState(BOOKS_DATA[0]);
  const role = user?.role;
  const navigate = useNavigate();

  // const handleClick = React.useCallback((item) => {
  //   setSelectedItem(item);
  // }, []);

  // const [quantity, setQuantity] = useState(1);

  // const handleQuantityChange = (operation) => {
  //   setQuantity((prev) => {
  //     if (operation === "increase") return prev + 1;
  //     if (operation === "decrease" && prev > 1) return prev - 1;
  //     return prev;
  //   });
  // };

  const buyNow = () => {
    alert(`Proceeding to buy ${quantity} item(s).`);
  };

  const formatToRupees = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const { id } = useParams();
  // console.log("Fetched ID from params:", id);

  const [data, setData] = useState([]); // Initialize as an empty array to avoid `.map` issues

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(`/api/book/getBookById/${id}`);
        console.log(response);

        setData(response.data); // Access the "data" property from the response
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleFavourites = async () => {
    try {
      await axiosInstance.patch(
        "/api/favorites/addBookToFavorite",
        {},
        {
          headers: {
            bookid: id, // Using the book ID from useParams
            id: user._id, // Replace with the actual user ID (e.g., from auth state)
          },
          withCredentials: true, // Ensures authentication tokens are sent
        }
      );
      toast.success("Added to Favourites.");
    } catch (error) {
      console.error(
        "Error adding to favourites:",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const addToCart = async () => {
    try {
      await axiosInstance.patch(
        "/api/cart/addBookToCart",
        {},
        {
          headers: {
            bookid: id, // Using the book ID from useParams
            id: user._id, // Replace with the actual user ID (e.g., from auth state)
          },
          withCredentials: true, // Ensures authentication tokens are sent
        }
      );
      toast.success(`${data.title} Added to Cart.`);
    } catch (error) {
      console.error(
        "Error adding to Cart:",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete("/api/book/deleteBook", {
        headers: {
          bookid: id,
        },
        withCredentials: true,
      });
      toast.success(response.data.message);
      navigate("/allbooks");
    } catch (error) {
      console.log("Error in deleting Book", error);
      toast.error(response.data.message);
    }
  };

  const book = {
    price: data?.price ? formatToRupees(data.price) : "₹0.00",
  };

  return (
    <div>
      <NavBar />
      {/* ✅ Desktop View (Hidden on Mobile) */}

      <div className="hidden md:flex w-full h-93vh justify-center align-middle bg-slate-50">
        <div className="w-80vw h-full flex flex-row justify-center items-center bg-slate-50">
          <div className="w-55% h-90% gap-4  bg-slate-50 flex items-center">
            <div className="w-1/4 h-full flex flex-col justify-center gap-3">
              {BOOKS_DATA.map((item, index) => {
                return (
                  <div
                    onClick={() => handleClick(item)}
                    key={`${item.id}-${index}`}
                    className="relative w-full h-32% bg-slate-500 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src={item.src}
                      alt={`img-id-${item.id}`}
                      className="absolute h-full m-auto object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-400 w-full h-full rounded-lg relative flex items-center justify-center">
              <img
                src={data.coverImage}
                alt={`img-id-${selectedItem.id}`}
                className="absolute h-full m-auto object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="w-45% h-90% mr-4 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between flex-col text-black">
              {role === "user" && (
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-semibold pb-2">{data.title}</h1>
                  <button
                    onClick={handleFavourites}
                    className="text-3xl text-slate-700 pr-1"
                  >
                    <FaRegHeart className="text-pink-400" />
                  </button>
                </div>
              )}

              {role === "author" && (
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-semibold pb-2">{data.title}</h1>{" "}
                  <button
                    onClick={handleDelete}
                    className="text-3xl text-slate-700 pr-1"
                  >
                    <MdOutlineDelete className="text-red-500 text-3xl cursor-pointer" />
                  </button>
                </div>
              )}

              {/* {role === "author" &&
                <div className="flex justify-end items-center">
                  <Link to={`/updatebook/${id}`}>

                    <FaEdit className="text-black text-3xl cursor-pointer" />
                  </Link>
                </div>

              } */}

              <p className="text-2xl text-gray-800 font-semibold mt-2">
                {book.price}
              </p>
              <p className="text-sm text-gray-500 mt-1 pb-6">(32 reviews)</p>
              <hr />
              <p className="text-gray-600 mt-6">{data.description}</p>

              <ul className="list-disc list-inside text-gray-600 mt-4">
                <li>By : {data.author?.name || "Unknown Author"}</li>
                <li>Language : {data.language}</li>
                <li>Category : {data.category}</li>
                <li>No. of Pages : {data.pages}</li>
                <li>No. of Copies in Stock : {data.stock}</li>
                <li>
                  {" "}
                  Publication Date :{" "}
                  {new Date(data.publicationDate).toLocaleString()}
                </li>
                {/* {new Date(order.createdAt).toLocaleString()} */}
              </ul>
            </div>
            {/* Extra Information */}
            <div className="text-gray-500 text-sm mt-7">
              <p>✅ Free worldwide shipping on all orders over $100</p>
              <p>
                ✅ Delivers in 3-7 Working Days{" "}
                <span className="text-blue-500">Shipping & Return</span>
              </p>
            </div>

            {/* <div className="flex items-center mt-6">
              <button
                className="h-11 px-4 py-2 bg-slate-50 rounded-l-3xl border-t border-b border-l border-gray-200 hover:bg-gray-300"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="h-11 w-12 text-center bg-slate-50 border-t border-b border-gray-200"
              />
              <button
                className=" h-11 px-4 py-2 bg-slate-50 rounded-r-3xl border-t border-b border-r border-gray-200 hover:bg-gray-300"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div> */}
            <div className="flex space-x-4 mt-7">
              <button
                className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              {/* <button
                className="w-1/2 px-6 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                onClick={buyNow}
              >
                Buy Now
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Mobile View (Hidden on Desktop) */}
      <div className="block md:hidden justify-center align-middle bg-slate-50">
        <div className="mx-3 h-120vh flex flex-col justify-center items-center bg-slate-50 pt-3">
          <div className="w-full h-full gap-4  bg-slate-50 flex items-center">
            <div className="w-1/4 h-full flex flex-col justify-center gap-3">
              {BOOKS_DATA.map((item, index) => {
                return (
                  <div
                    onClick={() => handleClick(item)}
                    key={`${item.id}-${index}`}
                    className="relative w-full h-32% bg-slate-500 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src={item.src}
                      alt={`img-id-${item.id}`}
                      className="absolute h-full m-auto object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-400 w-full h-full rounded-lg relative flex items-center justify-center">
              <img
                src={data.coverImage}
                alt={`img-id-${selectedItem.id}`}
                className="absolute h-full m-auto object-cover "
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <button
                onClick={handleFavourites}
                className="text-2xl text-gray-700"
              >
                <FaRegHeart />
              </button>
            </div>
            <p className="text-xl font-semibold text-gray-800 mt-2">
              {formatToRupees(data.price)}
            </p>
            <p className="text-sm text-gray-500">(32 reviews)</p>
            <p className="text-gray-600 mt-4">{data.description}</p>

            <ul className="list-disc text-gray-600 mt-4 pl-5">
              <li>By: {data.author?.name || "Unknown"}</li>
              <li>Language: {data.language}</li>
              <li>Category: {data.category}</li>
              <li>Pages: {data.pages}</li>
              <li>Stock: {data.stock}</li>
              <li>Published: {data.publicationDate}</li>
            </ul>

            {/* <div className="flex items-center mt-6">
              <button
                className="h-10 w-10 bg-gray-200 rounded-l-lg"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="h-10 w-12 text-center bg-gray-100"
              />
              <button
                className="h-10 w-10 bg-gray-200 rounded-r-lg"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div> */}

            {role === "author" && (
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold pb-2">{data.title}</h1>{" "}
                <button
                  onClick={handleDelete}
                  className="text-3xl text-slate-700 pr-1"
                >
                  <MdOutlineDelete className="text-red-500 text-3xl cursor-pointer" />
                </button>
              </div>
            )}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full mt-6">
              <button
                className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 "
                onClick={addToCart}
              >
                Add to Cart
              </button>
              {/* <button className="flex-1 px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400" onClick={buyNow}>
                Buy Now
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewBook;
