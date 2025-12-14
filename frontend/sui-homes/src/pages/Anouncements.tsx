import { useMemo } from "react";

interface Announcement {
  id: string;
  message: string;
  timestamp: number; // unix ms
}

// Mock data – replace with API / on-chain fetch
const announcements: Announcement[] = [
  {
    id: "1",
    message: "Water maintenance scheduled for Friday at 10:00 AM.",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: "2",
    message: "New proposal available: Elevator modernization vote is live.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "3",
    message: "Monthly HOA report has been published.",
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
  },
];

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

export default function AnnouncementsPage() {
  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort((a, b) => b.timestamp - a.timestamp);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Announcements</h1>

        {sortedAnnouncements.length === 0 ? (
          <div className="text-neutral-400 text-center py-20">
            No announcements yet
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm hover:border-neutral-700 transition"
              >
                <p className="text-base leading-relaxed">
                  {announcement.message}
                </p>

                <div className="mt-3 text-sm text-neutral-400">
                  {formatDate(announcement.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
