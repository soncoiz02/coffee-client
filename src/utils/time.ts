import { format, isValid, parse } from "date-fns";
import { enGB, vi } from 'date-fns/locale'

export const formatDate = (date: string | Date, type: string) => {
    return format(new Date(date), type, { locale: vi })
}

export const isValidDate = (date: string) => {
    const parsedDate = parse(date, 'P', new Date(), { locale: enGB });
    const isValidDate = isValid(parsedDate);
    return isValidDate
}