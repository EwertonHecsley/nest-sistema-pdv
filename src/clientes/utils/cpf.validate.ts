export class CpfValidator {

    private readonly regex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

    isValid(cpf: string): boolean {
        return this.regex.test(cpf);
    }
}
