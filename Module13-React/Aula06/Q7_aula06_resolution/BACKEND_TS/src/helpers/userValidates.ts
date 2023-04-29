abstract class Validate {
    public fail: boolean = false;
    public message: string;

    constructor() {
        this.message = "[validate]: validates OK";
    }

    protected testData(_data: string, _message: string, _regex: RegExp) {
        if (!_regex.test(_data)) {
            this.message = _message;
            this.fail = true;
        }
    }
}

export class UserValidate extends Validate {
    constructor(name: string, email: string, password: string) {
        super();
        this.validateName(name);
        this.validateEmail(email);
        this.validatePassword(password);
    }

    private validateName(name: string) {
        const regex = /^[a-zA-Zà-úÀ-Ú ]+$/;
        if (!this.fail)
            this.testData(name, "[name]: the name is invalid", regex);
    }

    private validateEmail(email: string) {
        const regex = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        if (!this.fail)
            this.testData(email, "[e-mail]: the e-mail is invalid", regex);
    }
    private validatePassword(password: string) {
        const regex = /^\w{1,}$/gim;
        if (!this.fail)
            this.testData(
                password,
                "[password]: the password is invalid",
                regex
            );
    }
}

export class LoginValidate extends Validate {
    constructor(email: string, password: string) {
        super();
        this.validateEmail(email);
        this.validatePassword(password);
    }

    private validateEmail(email: string) {
        const regex = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        if (!this.fail)
            this.testData(email, "[e-mail]: the e-mail is invalid", regex);
    }

    private validatePassword(password: string) {
        const regex = /^\w{1,}$/gim;
        if (!this.fail)
            this.testData(
                password,
                "[password]: the password is invalid",
                regex
            );
    }
}
