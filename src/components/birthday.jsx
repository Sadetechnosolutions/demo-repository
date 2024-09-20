import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core styles
import { Calendar } from 'primereact/calendar';

const Birthday = () => {
  const options = { month: 'long', day: 'numeric' };
  const today = new Date();
  const currentDate = today.toLocaleDateString('en-US', options);

  const userId = useSelector((state) => state.auth.userId);

  const [selectedDate, setSelectedDate] = useState(null); // State to hold selected date
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const [users, setUsers] = useState([]);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
    1600: { items: 1 },
  };

  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 flex hover:bg-pink hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-32 ml-32"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="grommet-icons:next" />
    </button>
  );

  const renderBackButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 hover:bg-pink hover:text-white bg-gray-100 rounded-full -mt-32 -ml-40"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="ic:twotone-arrow-back-ios" />
    </button>
  );

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  const handleDateChange = (e) => {
    const date = e.value;
    setSelectedDate(date);
    setShowCalendar(false); // Hide calendar after selecting date
  };

  // Ensure selectedDate is a Date object for correct comparison
  const selectedDateString = selectedDate ? selectedDate.toLocaleDateString('en-US', options) : currentDate;

  const filteredUsers = users.filter((user) => {
    const date = new Date(user.birthday);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate === selectedDateString;
  });

  return (
    <div className="w-full flex flex-col bg-white gap-6 rounded-md shadow-lg">
      <div className="w-full px-4 py-2 flex justify-between items-center bg-pink text-lg font-semibold ">
        <span className="text-white">Birthdays</span>
        <span className="bg-pink text-center w-1/2" onClick={handleDateClick}>
        <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            placeholder={currentDate}
            showButtonBar
            dateFormat="dd/MM"
            className=" px-2 "
          />
        </span>
      </div>
      {showCalendar && (
        <div className="px-4">

        </div>
      )}
      {filteredUsers.length > 0 ? (
        <AliceCarousel
          disableDotsControls
          responsive={responsive}
          autoPlay
          infinite
          autoPlayInterval={4000}
          renderNextButton={renderNextButton}
          renderPrevButton={renderBackButton}
        >
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex flex-col gap-2 items-center justify-center">
              <div className="flex items-center gap-2">
                <img className="w-16 h-16 rounded-full" src={user.profileImagePath} alt={`Profile of ${user.name}`} />
              </div>
              <span className="relative text-lg flex items-end font-semibold w-64">
                {user.name} celebrating their birthday today <span className='absolute bottom-0 text-center left-32 items-center gap-1 flex'> <Icon className='w-6 h-6' icon="noto:party-popper" /></span>
              </span>
              <div>
                <img
                  className="w-36 h-36"
                  src="birthday.gif"
                  alt="Birthday celebration"
                />
              </div>
            </div>
          ))}
        </AliceCarousel>
      ) : (
        <div className="text-center py-4 text-lg font-semibold">
          <span>No birthdays today</span>
          <div className='w-full flex justify-center'>
            <img
              className="w-36 h-36"
              src="birthday.gif"
              alt="No birthdays"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Birthday;
