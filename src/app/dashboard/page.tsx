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

  // See: https://developers.google.com/calendar/api/v3/reference/calendars/insert?hl=zh-tw
  const handleAddCalendar = async () => {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: "Test Calendar",
          description: "This calendar is added by Google Calendar API",
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    // Add the new calendar to the list
    setCalendars((calendars) => [...calendars, data]);
  };

  return (
    <div className="w-1/2 border p-4 m-4">
      <div className="w-full flex justify-between p-2">
        <h1 className="font-bold m-2">My Calendars</h1>
        <button onClick={handleAddCalendar}>Add Calendar</button>
      </div>
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
