export function formatCurrency({ amount, currency }) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount
  );
}
