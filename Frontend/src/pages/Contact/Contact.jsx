import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "boxicons";
import NavBar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

const App = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <NavBar />
      <div className="h-93vh flex flex-col justify-center bg-gray-50 ">
        <section id="contact" className="py-16 ">
          <ToastContainer position="top-center" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Form Section */}
                <div className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                  <form>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full p-4 text-sm text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={handleInputChange}
                        value={name}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-4 text-sm text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={handleInputChange}
                        value={email}
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full p-4 text-sm text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={handleInputChange}
                        value={subject}
                      />
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows="6"
                        className="w-full p-4 text-sm text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={handleInputChange}
                        value={message}
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg transition"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Right Contact Info Section */}
                <div className="p-8 bg-gray-50 ml-2">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    Contact us
                  </h3>
                  <p className="mb-4 text-gray-600">
                    We're open for any suggestion or just to have a chat.
                  </p>
                  <div className="space-y-7">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full">
                        <box-icon name="current-location"></box-icon>
                      </div>
                      <div className="ml-4 text-gray-800">
                        <p className="font-bold">Address:</p>
                        <p>
                          Modern Colony, Ranipur Mode, Haridwar 249401,
                          Uttarakhand
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full">
                        <box-icon type="solid" name="phone"></box-icon>
                      </div>
                      <div className="ml-4 text-gray-800">
                        <p className="font-bold">Phone:</p>
                        <a
                          href="tel:+918954862155"
                          className="text-purple-600 hover:underline"
                        >
                          +91 89548 62155
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full">
                        <box-icon name="envelope"></box-icon>
                      </div>
                      <div className="ml-4 text-gray-800">
                        <p className="font-bold">Email:</p>
                        <a
                          href="mailto:jai.ksaini@outlook.com"
                          className="text-purple-600 hover:underline"
                        >
                          jai.ksaini@outlook.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full">
                        <box-icon name="globe"></box-icon>
                      </div>
                      <div className="ml-4 text-gray-800">
                        <p className="font-bold">Website:</p>
                        <a
                          href="https://github.com/jaiksaini"
                          className="text-purple-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          jaikumarsaini.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default App;
