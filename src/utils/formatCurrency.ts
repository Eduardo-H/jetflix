export function formatCurrency(value: number) {
  const formatedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

  return formatedCurrency;
}