import React from 'react';

const Rascunho = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="bg-yellow-500 py-8 hidden sm:block ">
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-gray-900 text-white 
                        px-3 py-2 rounded-md text-sm 
                        font-medium"
              aria-current="page"
            >
              GeeksForGeeks Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 
                        hover:bg-gray-700 
                        hover:text-white px-3 py-2 
                        rounded-md text-sm font-medium"
            >
              Team
            </a>

            <a
              href="#"
              className="text-gray-300 
                        hover:bg-gray-700
                        hover:text-white px-3 py-2 
                        rounded-md text-sm font-medium"
            >
              Projects
            </a>

            <a
              href="#"
              className="text-gray-300 
                        hover:bg-gray-700 hover:text-white 
                        px-3 py-2 rounded-md 
                        text-sm font-medium"
            >
              Calendar
            </a>
          </div>
        </div>

        <div className="bg-green-500 flex flex-grow">
          This is the other content on screen
        </div>
      </div>
    </div>
  );
};

export default Rascunho;
