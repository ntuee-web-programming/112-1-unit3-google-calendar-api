"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Calendar = {
  description: string;
  summary: string;
  backgroundColor: string;
};

export default function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  const router = useRouter();
  const [calendars, setCalendars] = useState<Calendar[]>([]);

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
      setCalendars(data.items);
      console.log(data);
    };
    fetchCalendars();
  }, [accessToken, router]);
  return (
    <div className="w-1/2 border p-4 m-4">
      <h1 className="font-bold m-2">My Calendars</h1>
      <ul className="flex flex-col gap-2">
        {calendars.map((calendar, index) => (
          <li key={index} className="px-2 py-1 border flex gap-2 items-center">
            <div
              className="aspect-[1/1] h-8 w-8 rounded-lg"
              style={{
                backgroundColor: calendar.backgroundColor,
              }}
            ></div>
            <div className="">
              <p className="font-semibold">{calendar.summary}</p>
              <p className="text-gray-600 text-sm ">{calendar.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
