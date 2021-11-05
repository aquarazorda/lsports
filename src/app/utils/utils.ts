type ObjWithKeyString = Record<string, any>

export default class Utils {
    /** Accepts a number, which will be added or substracted
     * to the current time. Returns a new date */
    static generateDate = (hours: number): Date => {
        let date = new Date();
        date.setHours(date.getHours() + hours);
        return date;
    }

    static dateToString = (date: Date): string => date.toISOString().slice(0, 16)

    static alreadyPassed = (date: Date): boolean => date >= new Date();

    static timeDiffIsValid = (obj: ObjWithKeyString, key: string, ms: number): boolean =>
        obj[key].valueOf() - new Date().valueOf() < ms;
}