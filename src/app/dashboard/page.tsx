"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      router.push("/");
      return;
    }
    // See: https://developers.google.com/calendar/api/v3/reference/calendarList/list?hl=zh-tw
    const fetchCalendars = async () => {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };
    fetchCalendars();
  }, [accessToken, router]);
  return (
    <div className="w-full">
      <h1>Calendars</h1>
    </div>
  );
}
