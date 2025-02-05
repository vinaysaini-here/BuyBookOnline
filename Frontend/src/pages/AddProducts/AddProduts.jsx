import React, { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import { FaUpload } from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

const CLOUDINARY_CLOUD_NAME = "dgldmpf9v"; // Your Cloudinary Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "book_uploads"; // Set this in Cloudinary settings

const AddProducts = () => {
  const { user } = useAuthStore();
  const userId = user?._id;
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    language: "",
    publicationDate: "",
    pages: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State for preview
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload a cover image.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const coverImageUrl = cloudinaryResponse.data.secure_url;

      // Send book data to backend
      const response = await axiosInstance.post(
        "/api/book/saveBook",
        { ...bookData, coverImage: coverImageUrl },
        {
          headers: { id: userId },
          withCredentials: true, // Send credentials for authentication
        }
      );

      toast.success("Book added successfully!");
      setBookData({
        title: "",
        author: "",
        description: "",
        price: "",
        category: "",
        language: "",
        publicationDate: "",
        pages: "",
        stock: "",
      });
      setImageFile(null);
      setPreviewImage(null); // Clear preview after submission
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center align-middle bg-gray-900 min-h-screen">
        <div className="w-4/5 max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-white">Book Cover Image</label>
              <label className="border-2 border-dashed border-gray-300 p-4 cursor-pointer block text-center text-gray-500 mt-2">
                <FaUpload className="text-2xl mb-2" />
                <span className="text-sm">Click to upload or drag & drop</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {/* Image Preview */}
              {previewImage && (
                <div className="mt-4 flex justify-center">
                  <img src={previewImage} alt="Selected Book Cover" className="w-40 h-40 object-cover rounded-lg border" />
                </div>
              )}
            </div>

            {/* Form Inputs */}
            <div>
              <label className="block text-white">Title</label>
              <input type="text" name="title" value={bookData.title} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
            </div>

            <div>
              <label className="block text-white">Author ID</label>
              <input type="text" name="author" value={bookData.author} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
            </div>
            <div>
              <label className="block text-white">Pages</label>
              <input type="number" name="pages" value={bookData.pages} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
            </div>

            <div>
              <label className="block text-white">Description</label>
              <textarea name="description" value={bookData.description} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" rows="3"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white">Price</label>
                <input type="number" name="price" value={bookData.price} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
              </div>
              <div>
                <label className="block text-white">Stock</label>
                <input type="number" name="stock" value={bookData.stock} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white">Language</label>
                <input type="text" name="language" value={bookData.language} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
              </div>
              <div>
                <label className="block text-white">Category</label>
                <input type="text" name="category" value={bookData.category} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block text-white">Publication Date</label>
              <input type="date" name="publicationDate" value={bookData.publicationDate} onChange={handleChange} required className="w-full mt-2 bg-gray-700 text-white p-2 rounded" />
            </div>

            <button type="submit" disabled={isSubmitting} className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
