import { Message } from "../store/types";

export function checkString(substring: string, str: string): boolean {
  if (!substring) {
    return false;
  }
  for (let i = 0; i < substring.length; i++) {
    if (substring[i].toLowerCase() !== str[i].toLowerCase()) {
      return false;
    }
  }

  return true;
}
export function groupMessagesByDate(messages: Message[]): Message[][] {
  const groups: { [key: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return Object.values(groups);
}
export function getReadableDate(dateStr: Date): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days <= 6) {
    return `${days} days ago`;
  } else if (days <= 13) {
    return "1 week ago";
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }
}
export function formatDate(dateStr: Date): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins <= 59) {
    if (diffMins === 0) {
      return "now";
    }
    return `${diffMins} minutes ago`;
  } else if (diffHours <= 23) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }
}
