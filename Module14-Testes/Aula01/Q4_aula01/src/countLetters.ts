interface ICounts {
    uppercase: number;
    lowercase: number;
}

interface IError {
    error: string;
}

export function countLetters(input: any): ICounts | IError {
    if (typeof input !== "string") {
        return { error: "Invalid input" };
    }

    let uppercaseCount = 0;
    let lowercaseCount = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i].toUpperCase() === input[i]) {
            uppercaseCount++;
        } else if (input[i].toLowerCase() === input[i]) {
            lowercaseCount++;
        }
    }

    return {
        uppercase: uppercaseCount,
        lowercase: lowercaseCount,
    };
}
