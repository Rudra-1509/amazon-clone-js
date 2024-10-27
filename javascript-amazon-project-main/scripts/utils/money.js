export function formatCurrency(inputCents)
{
    return ((Math.round(inputCents)/100).toFixed(2));
}