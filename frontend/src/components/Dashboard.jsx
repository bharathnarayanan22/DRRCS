import React, { useEffect, useState } from "react";
import CoordinatorUI from "../UI/CoordinatorUI";
import VolunteerUI from "../UI/VolunteerUI";
import DonorUI from "../UI/DonorUI";
import axios from "axios";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/users/role", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  if (!userRole) {
    return <div>Loading...</div>;
  }

  if (userRole === "coordinator") {
    return <CoordinatorUI />;
  } else if (userRole === "volunteer") {
    return <VolunteerUI />;
  } else if (userRole === "donor") {
    return <DonorUI />;
  } else {
    return <div>Unauthorized access</div>;
  }
};

export default Dashboard;
