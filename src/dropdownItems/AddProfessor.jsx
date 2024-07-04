import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCloudUploadAlt, FaReact } from 'react-icons/fa';

const AddProfessor = () => {
  const [startDate, setStartDate] = React.useState(null);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-400 to-green-400">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4 flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">BASIC INFORMATION</h2>
          </div>
          <p className="text-gray-500 mb-6">Description Text Here...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-3 border-gray-50">
            {[
              { placeholder: 'First Name', type: 'text' },
              { placeholder: 'Last Name', type: 'text' },
              { placeholder: 'Date of Birth', type: 'datePicker' },
              { placeholder: 'Select Gender', type: 'select', options: ['-- Gender --', 'Male', 'Female', 'Other'] },
              { placeholder: 'Department', type: 'text' },
              { placeholder: 'Position', type: 'text' },
              { placeholder: 'Phone', type: 'tel' },
              { placeholder: 'Enter Your Email', type: 'email' },
              { placeholder: 'Website URL', type: 'url' },
            ].map((input, index) => (
              <div key={index} className="relative">
                {input.type === 'select' ? (
                  <select className="mt-4 block w-full bg-white border-b-2 border-gray-700 text-black focus:border-blue-500 outline-none transform transition-colors duration-300">
                    {input.options.map((option, i) => (
                      <option key={i} value={option} disabled={option === '-- Gender --'} >{option}</option>
                    ))}
                  </select>
                ) : input.type === 'datePicker' ? (
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="mt-8 pb-3 block text-black w-full bg-white border-b-2 border-gray-300 focus:border-blue-500 outline-none transform transition-colors duration-300"
                    placeholderText="Date of Birth"
                  />
                ) : (
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="mt-8 pb-3 block mb-5 text-black w-full bg-white border-b-2 border-gray-300 focus:border-blue-500 outline-none transform transition-colors duration-300 placeholder-opacity-100"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-20">
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition duration-300">
              <FaCloudUploadAlt className="text-gray-400 mx-auto text-3xl" />
              <p className="text-gray-500 mt-2">Drop files here or click to upload.</p>
              <p className="text-gray-400 text-sm">(This is just a demo dropzone. Selected files are <span className="font-bold">not</span> actually uploaded.)</p>
            </div>
          </div>
          <div className="mt-10">
            <textarea
              className="w-full bg-white border-2 text-black border-gray-300 p-4 rounded-lg focus:border-blue-500 outline-none transform transition-colors duration-300"
              rows="2"
              placeholder="Please type what you want..."
            ></textarea>
          </div>
          <div className="mt-4 flex justify-start ">
          <button className="btn bg-gradient-to-r from-pink-500 to-pink-950 hover:shadow-lg shadow-pink-700 mr-2 ">
            Submit
          </button>
          <button className="btn bg-gradient-to-r from-pink-500 to-pink-950 hover:shadow-lg shadow-pink-700 ml-2 ">
            Cancel
          </button>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default AddProfessor;
