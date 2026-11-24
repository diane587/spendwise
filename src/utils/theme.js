export const colors = {
  primary: '#4F46E5', bg: '#F5F6FA', card: '#FFFFFF', text: '#1F2937',
  muted: '#6B7280', income: '#16A34A', expense: '#DC2626', border: '#E5E7EB',
};
export const currencies = [
  { code: 'NGN', symbol: '₦' }, { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' }, { code: 'EUR', symbol: '€' },
];
export const categories = {
  Expense: ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'],
  Income: ['Salary', 'Business', 'Gift', 'Other'],
};
export const formatMoney = (n, symbol) =>
  symbol + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
