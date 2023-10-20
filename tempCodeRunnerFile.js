const formattedDate = new Date("2023-10-19T15:53:24.000Z").toLocaleString(
  "en-US",
  {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }
);

console.log(formattedDate);
