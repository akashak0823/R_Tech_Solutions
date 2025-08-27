// src/admin/components/AdminLayout.js

import React from "react";
import Sidebar from "./Sidebar";


const AdminLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
     
      <main style={{ marginLeft: "220px", padding: "80px 30px 30px" }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
