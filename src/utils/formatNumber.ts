export const numberToPrice = (number: number) => {
    const currency = new Intl.NumberFormat("vi-VN", { currency: "VND", style: "currency" })
    return currency.format(number)
}

export const stringThounsandToNumber = (number: string) => {
    return +number.split(",").join("")
}

export const formatToThousandSeparator = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
}