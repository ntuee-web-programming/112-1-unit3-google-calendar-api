"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    // Get accessToken from searchParams
    const accessToken = searchParams.get("token");
    if (!accessToken) {
      router.push("/");
      return;
    }
    // Save accessToken to localStorage
    localStorage.setItem("accessToken", accessToken);

    // Redirect to dashboard
    router.push("/dashboard");
  }, [router, searchParams]);
  return (
    <div>
      <h1>Callback</h1>
      <p>{searchParams.get("token")}</p>
    </div>
  );
}
