export function validateTransaction({ title, amount, type, category, date }) {
  const errors = {};
  if (!title.trim()) errors.title = 'Title is required';
  const num = parseFloat(amount);
  if (!amount.trim()) errors.amount = 'Amount is required';
  else if (isNaN(num) || num <= 0) errors.amount = 'Enter a number greater than 0';
  if (!type) errors.type = 'Select a type';
  if (!category) errors.category = 'Select a category';
  if (!date) errors.date = 'Select a date';
  return errors;
}
