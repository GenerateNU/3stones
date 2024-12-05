export function formatNum(x: number) {
    // Convert cents to dollars and format with commas
    const dollars = (x / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return dollars;
  }
  