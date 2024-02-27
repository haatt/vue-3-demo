export default class CurrencyHandler {
  static format(amount: number | string) {
    const amountInCents = (Number(amount) / 100).toFixed(2);
    const sections = amountInCents.split(".");
    sections[0] = sections[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$ ${sections.join(".")}`;
  }
}
