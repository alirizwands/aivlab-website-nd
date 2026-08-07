"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

export default function PrivacyAnalytics() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        const url = new URL(event.url, window.location.origin);
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      }}
    />
  );
}
