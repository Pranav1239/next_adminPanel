"use client"
import { useEffect, useState } from "react";
import { getServerSession, Session } from "next-auth"; // Ensure Session type is imported
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getUser = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession(authOptions);
      setSession(sessionData as Session); // Using as assertion to inform TypeScript about the type
    };

    fetchSession();
  }, []);

  return session;
};
