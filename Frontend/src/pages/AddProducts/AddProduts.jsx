import React from "react";
import NavBar from "../../Components/Navbar/NavBar";


const AddProduts = () => {

  return (
    <div>
      <NavBar />
      <div className="flex justify-center align-middle bg-slate-200">
        <div className="h-93vh w-85vw  max-w-7xl ">
          <div className="w-full h-10 ">
            <p className="text-3xl text-black pt-4 font-semibold">
              Add New Product
            </p>
            <div>
              <form>
                <div className=" h-[100%] md:4 ">
                  <div className="p-4 bg-transparent ">
                    <div className="gap-4">
                      <div>
                        <p className=" text-black">Product Images</p>
                        <div className="border-black border-2 mt-2 rounded-md h-32 absolute flex  ">
                          <div className="flex flex-wrap gap-4 relative p-2">

                            <label className="w-28 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-center text-gray-500 hover:bg-gray-50 cursor-pointer">

                              <span className="text-sm">
                                Click to upload or drag and drop
                              </span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"

                                className="hidden "
                              />
                            </label>




                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-32">
                        <label htmlFor="" className=" text-black">
                          Title of book
                        </label>

                        <input
                          type="text"
                          className="w-full mt-2 bg-white rounded-lg text-zinc-100 p-2 outline-none"
                          placeholder="title of book"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="" className="text-black">
                          Author of book
                        </label>

                        <input
                          type="text"
                          className="w-full mt-2 bg-white rounded-lg text-zinc-100 p-2 outline-none"
                          placeholder="author of book"
                          required
                        />
                      </div>

                      <div className="flex mt-4">
                        <div className="w-3/6 pr-4">
                          <label htmlFor="" className=" text-black">
                            Price
                          </label>

                          <input
                            type="number"
                            className="w-full mt-2 rounded-lg bg-white text-zinc-100 p-2 outline-none"
                            placeholder="price of book"
                            name="price"
                            required
                          />
                        </div>
                        <div className="w-3/6">
                          <label htmlFor="" className=" text-black">
                            Language
                          </label>

                          <input
                            type="text"
                            className="w-full mt-2 bg-white rounded-lg text-zinc-100 p-2 outline-none"
                            placeholder="language of book"
                            name="language"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="" className=" text-black">
                          Description
                        </label>

                        <textarea
                          className="w-full mt-2 bg-white rounded-lg text-zinc-100 p-2 outline-none"
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduts;
