import { useSession } from "next-auth/react";
import React from "react";

const AdminPage = async () => {
  const { data: session } = useSession()
  if (session?.user.role === "admin") {
    return (
      <div>
        This is admin dashboard
        {JSON.stringify(session)}
      </div>
    );
  }

  return (
    <>
      <h1>Need Admin Access</h1>
    </>
  )

};

export default AdminPage;
