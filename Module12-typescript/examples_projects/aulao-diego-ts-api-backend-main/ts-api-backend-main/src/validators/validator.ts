import { validate, version } from "uuid";
export default class Validator {
    public static string(field: string, data: any, minLength?: number, maxLength?: number): string[] {
        let errors: string[] = [];

        if (data === undefined || data === null) {
            errors.push(`[${field}] - type is required`);
            return errors;
        }

        if (typeof data !== "string") {
            errors.push(`[${field}] - type is not string`);
            return errors;
        }
        if (minLength && data.length < minLength) {
            errors.push(`[${field}] - String is too short. Min length is ${minLength}`);
        }
        if (maxLength && data.length > maxLength) {
            errors.push(`[${field}] - String is too long. Max length is ${maxLength}`);
        }
        return errors;
    }

    public static number(field: string, data: any, min?: number, max?: number): string[] {
        let errors: string[] = [];

        if (data === undefined || data === null) {
            errors.push(`[${field}] - type is required`);
            return errors;
        }

        if (isNaN(data)) {
            errors.push(`[${field}] - type is not number`);
            return errors;
        }

        data = Number(data);

        if (min && data < min) {
            errors.push(`[${field}] - Number is too small. Min is ${min}`);
        }
        if (max && data > max) {
            errors.push(`[${field}] - Number is too big. Max is ${max}`);
        }
        return errors;
    }

    public static uuid(field: string, data: any): string[] {
        let errors: string[] = [];

        if (data === undefined || data === null) {
            errors.push(`[${field}] - type is required`);
            return errors;
        }

        if (!validate(data) || version(data) !== 4) {
            errors.push(`[${field}] - type is not uuid v4`);
        }

        return errors;
    }
}
