export function formatMoney(
  amountCents: number,
  currency: string = "AUD",
  locale: string = "en-AU"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amountCents / 100);
}

export function formatDate(
  iso: string,
  locale: string = "en-AU",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(iso));
}
