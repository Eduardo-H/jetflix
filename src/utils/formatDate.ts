export function formatDate(date: string) {
  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formatedDate;
}