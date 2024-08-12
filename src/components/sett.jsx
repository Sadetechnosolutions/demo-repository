import { motion } from "framer-motion";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define animation variants
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <div className="flex bg-white absolute flex-col"> 
    <motion.div
      className="sidebar bg-white"
      initial={false} // Don't animate on initial render
      animate={isOpen ? "open" : "closed"} // Use isOpen state to determine animation variant
      variants={sidebarVariants} // Apply animation variants
      transition={{ duration: 0.3 }} // Set transition duration
    >
      {/* Sidebar content */}

<button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
       { isOpen &&    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>}

      {/* Button to toggle sidebar */}

    </motion.div>
    </div>
  );
};

export default Sidebar;
