import React, { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import { FaUpload } from "react-icons/fa";

const AddProduts = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // Temporary URL for preview
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageReplace = (id) => {
    document.getElementById(`replace-${id}`).click();
  };

  const handleImageRemove = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };
  return (
    <div>
      <NavBar />
      <div className="flex justify-center align-middle bg-gray-900">
        <div className="w-85vw max-w-7xl ">
          <div className="w-full">
            <p className="text-3xl text-white pt-4 font-semibold">
              Add New Product
            </p>
            <div>
              <form>
                <div className=" h-[100%] md:4 ">
                  <div className="p-4 bg-transparent ">
                    <div className="gap-4">
                      <div>
                        <p className=" text-white">Product Images</p>
                        <div className="border-white border-2 mt-2 rounded-md h-32 absolute flex  ">
                          <div className="flex flex-wrap gap-4 relative p-2">
                            {/* Upload Box */}
                            <label className="w-28 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                              <FaUpload className="text-2xl mb-2" />
                              <span className="text-sm">
                                Click to upload or drag and drop
                              </span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden "
                              />
                            </label>

                            {/* Uploaded Images */}
                            {images.map((image) => (
                              <div
                                key={image.id}
                                className="relative w-28  border rounded-md overflow-hidden"
                              >
                                <img
                                  src={image.id}
                                  alt="Product Preview"
                                  className=" object-cover "
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 opacity-0 hover:opacity-100 transition">
                                  <button
                                    type="button"
                                    className="px-2 py-1 bg-white text-xs rounded shadow hover:bg-gray-100"
                                    onClick={() => handleImageReplace(image.id)}
                                  >
                                    Replace
                                  </button>
                                  <input
                                    type="file"
                                    id={`replace-${image.id}`}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageUpload({
                                        target: { files: e.target.files },
                                      })
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="px-2 py-1 bg-white text-xs rounded shadow hover:bg-gray-100"
                                    onClick={() => handleImageRemove(image.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-32">
                        <label htmlFor="" className=" text-white">
                          Title of book
                        </label>

                        <input
                          type="text"
                          className="w-full mt-2 bg-gray-700 rounded-lg text-slate-100 p-2 outline-none"
                          placeholder="title of book"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="" className="text-white">
                          Author of book
                        </label>

                        <input
                          type="text"
                          className="w-full mt-2 bg-gray-700 rounded-lg text-slate-100 p-2 outline-none"
                          placeholder="author of book"
                          required
                        />
                      </div>

                      <div className="flex mt-4">
                        <div className="w-3/6 pr-4">
                          <label htmlFor="" className=" text-white">
                            Price
                          </label>

                          <input
                            type="number"
                            className="w-full mt-2 rounded-lg bg-gray-700 text-slate-100 p-2 outline-none"
                            placeholder="price of book"
                            name="price"
                            required
                          />
                        </div>
                        <div className="w-3/6">
                          <label htmlFor="" className=" text-white">
                            Language
                          </label>

                          <input
                            type="text"
                            className="w-full mt-2 bg-gray-700 rounded-lg text-slate-100 p-2 outline-none"
                            placeholder="language of book"
                            name="language"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className="w-3/6 pr-4">
                          <label htmlFor="" className=" text-white">
                            Pages
                          </label>

                          <input
                            type="number"
                            className="w-full mt-2 rounded-lg bg-gray-700 text-slate-100 p-2 outline-none"
                            placeholder="number of pages"
                            name="pages"
                            required
                          />
                        </div>
                        <div className="w-3/6">
                          <label htmlFor="" className=" text-white">
                            Category
                          </label>

                          <input
                            type="text"
                            className="w-full mt-2 bg-gray-700 rounded-lg text-slate-100 p-2 outline-none"
                            placeholder="category of book"
                            name="category"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className="w-3/6 pr-4">
                          <label htmlFor="" className=" text-white">
                            Publication Date
                          </label>

                          <input
                            type="date"
                            className="w-full mt-2 rounded-lg bg-gray-700 text-slate-100 p-2 outline-none"
                            name="date"
                            required
                          />
                        </div>
                        <div className="w-3/6">
                          <label htmlFor="" className=" text-white">
                            Stock
                          </label>

                          <input
                            type="number"
                            className="w-full mt-2 bg-gray-700 rounded-lg text-slate-100 p-2 outline-none"
                            placeholder="stock available"
                            name="stock"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="" className=" text-white">
                          Description
                        </label>

                        <textarea
                          className="w-full mt-2 bg-gray-700 rounded-lg text-slate-100 p-2 outline-none"
                          placeholder="title of book"
                          rows="4"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                        onClick={() => alert("Uploaded")}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* <label for="category">Category:</label>
              <select id="category" name="category">
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
              </select> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduts;
