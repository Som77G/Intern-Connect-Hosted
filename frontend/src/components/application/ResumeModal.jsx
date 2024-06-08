import React from "react";

export default function ResumeModal({ pdfUrl, onClose }){
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white p-6 w-11/12 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <iframe 
          src={pdfUrl} 
          title="resume" 
          className="w-full h-96 md:h-[600px] border-none"
        />
      </div>
    </div>
  );
};


