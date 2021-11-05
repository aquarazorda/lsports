type ObjWithKeyString = Record<string, any>

export default class Utils {

    static newDate = () => new Date();

    /** Accepts a number, which will be added or substracted
     * to the current time. Returns a new date */
    static generateDate = (hours: number): Date => {
        let date = Utils.newDate();
        date.setHours(date.getHours() + hours);
        return date;
    }

    static dateToString = (date: Date): string => date.toISOString().slice(0, 16);

    static alreadyPassed = (date: Date): boolean => date >= Utils.newDate();

    static timeDiffIsValid = (obj: ObjWithKeyString, key: string, ms: number): boolean =>
        obj[key].valueOf() - Utils.newDate().valueOf() < ms;
}