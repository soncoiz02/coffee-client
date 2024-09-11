export const numberToPrice = (number: number) => {
    const currency = new Intl.NumberFormat("vi-VN", { currency: "VND", style: "currency" })
    return currency.format(number)
}