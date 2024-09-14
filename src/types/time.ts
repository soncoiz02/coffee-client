import { format } from "date-fns";
import { vi } from 'date-fns/locale'

export const formatDate = (date: string | Date, type: string) => {
    return format(new Date(date), type, { locale: vi })
}