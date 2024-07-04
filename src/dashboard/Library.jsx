import React from 'react';
import Libraryimg1 from '../../Staff_images/LibraryImg1.jpg';
import Libraryimg2 from '../../Staff_images/library2.jpg'; // Add another image for demonstration
import Libraryimg3 from '../../Staff_images/librarycollection.jpg'; // Add another image for demonstration

const Library = () => {
  return (
    <div className="container mx-auto p-10 text-black bg-gradient-to-r from-blue-400 to-green-400">
    
      
      <section className="mb-8 flex flex-col lg:flex-row items-center lg:items-start ">
        <img 
          src={Libraryimg1} 
          alt="Library Building" 
          className="lg:w-1/2 w-full mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
        />
        <div className="lg:w-1/2 w-full lg:pl-8 mt-20">
          <h2 className="text-3xl font-bold mb-4">Historical Background</h2>
          <p>Sri Venkateswara University, named after the Lord of the Seven Hills, came into existence as a teaching and affiliating University on the 2nd September, 1954, for the encouragement of higher education and research in all branches of learning. It was intended to fulfil the long felt need of the people of Rayalaseema for their educational advancement.</p>
        </div>
      </section>

      <section className="mb-8 flex flex-col mt-20 lg:flex-row-reverse items-center lg:items-start ">
        <img 
          src={Libraryimg2} 
          alt="Library Historical Event" 
          className="lg:w-1/2 w-full mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
        />
        <div className="lg:w-1/2 w-full lg:pr-8 mt-10 ">
          <h2 className="text-3xl font-bold mb-4">Genesis :</h2>
          <p>The University Library was started in the year 1955 with a small collection of 6,700 books taken from the Sri Venkateswara College, Tirupati, administered by Tirumala Tirupati Devasthanams. Initially the library was housed in one portion of the college main building. Later, it was shifted to the present building which was declared open on 12thJuly 1964, by Late Dr. S. Radhakrishnan, the then President of India. He described it as “Taj Mahal of the South”.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Growth and Collection</h2>
        <p>The university library, centrally situated and easily accessible to all the departments on the campus has steadily grown over the years and it has 3,76,000 documents as on 31st December 2016. It includes textbooks, reference books, general books, gift books, reports, back volumes of Journals, M.Phil., and Ph.D. Dissertations and E-Documents. The library subscribes to about 300 print journals of National and International importance.</p>
      </section>

      <section className="mb-8 flex flex-col lg:flex-row items-center lg:items-start">
        <img 
          src={Libraryimg3} 
          alt="Library Building" 
          className="lg:w-1/2 w-full mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
        />
        <div className="lg:w-1/2 w-full lg:pl-8">
          <h2 className="text-3xl font-bold mb-4">Objectives and Mission</h2>
          <ul className="list-disc list-inside">
            <li>To support the educational, research and extension programmes (present and anticipated) of the Sri Venkateswara University by providing access to global information;</li>
            <li>To provide reading facility and services to the students for the success of all formal programmes of instruction;</li>
            <li>To provide need based information products and services to facilitate scholarly research in the fields of special interest to the University;</li>
            <li>To help the faculty members in order to keep abreast of latest developments in their respective fields; and</li>
            <li>To co-operate with other libraries in India and abroad for resource sharing and networking.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Library;
