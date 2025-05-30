// import React from "react";
// import "../index.css";

// import { Link } from "react-router-dom";

// const UserName = () => {
//   return (
//     <>
//       <Link to="/explore/1">
//         <div class="text-amber-50 border mt-4  border-l-0 border-r-0 border-b-0   ml-2 mr-2 ">
//           Laura Kin
//         </div>
//       </Link>
//     </>
//   );
// };
// export default UserName;
// UserName.jsx
import React from "react";
import "../index.css";

const UserName = ({ name }) => {
  return (
    <div className="text-amber-50 border mt-4 border-l-0 border-r-0 border-b-0 ml-2 mr-2">
      {name}
    </div>
  );
};

export default UserName;
