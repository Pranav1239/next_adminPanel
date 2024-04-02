import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "admin") {
    return (
      <div>
        This is admin dashboard
        {JSON.stringify(session)}
      </div>
    );
  }

  return(
    <>
    <h1>Need Admin Access</h1>
    </>
  )

};

export default AdminPage;
