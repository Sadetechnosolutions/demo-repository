// components/DropdownMenu.js
import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const DropdownMenu = ({ onEdit, onDelete, onClose }) => {
  return (
    <div className="absolute right-0 bg-white border border-gray-300 shadow-lg rounded-md mt-6">
      <button onClick={() => { onEdit(); onClose(); }} className="block flex items-center px-3 w-full py-2 text-gray-700 hover:bg-gray-100"><Icon icon="tdesign:edit" />Edit</button>
      <button onClick={() => { onDelete(); onClose(); }} className="block flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100"><Icon icon="mdi:delete-outline" />Delete</button>
    </div>
  );
};

export default DropdownMenu;
