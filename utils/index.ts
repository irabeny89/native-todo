/**
 * Calculates and returns the time difference between the provided timestamp in milliseconds and the current time.
 * @param timestamp in milliseconds
 * @returns time string `eg 1sec ago`
 */
export function getTimeDiff(timestamp: number) {
  let time = "";
  // diff in seconds
  const diff = Math.round((Date.now() - timestamp) / 1e3);

  if (diff < 60) time = `${diff}sec ago`;
  else if (diff < 3600) time = `${+(diff / 60).toFixed()}min ago`;
  else if (diff < 86400) time = `${+(diff / 3600).toFixed()}hrs ago`;
  else time = `${+(diff / 86400).toFixed()}days ago`;

  return time;
}

export function sortDoneLast<T extends Record<"isDone", boolean>>(a: T, b: T) {
  return Number(a.isDone) - Number(b.isDone);
}
