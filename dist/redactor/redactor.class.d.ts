export declare class Redactor {
    private text;
    private PHONE_REGEX;
    private EMAIL_REGEX;
    private ADDRESS_REGEX;
    private SSN_REGEX;
    private LICENSE_REGEX;
    private CC_REGEX;
    private PASSPORT_REGEX;
    private IBAN_REGEX;
    private INTL_PHONE_REGEX;
    private redactions;
    constructor();
    get count(): number;
    redact(text: string): string;
    /**
     * Refills (rehydrates) any Mock PII with original PII
     * This function can take any string, find the mock PII and replace
     * it with the original PII.
     * @param text
     * @returns string
     */
    refill(text: string): string;
    /**
     * Redacting Text
     * Identifies any matches and replaces them with the corresponding mock Personally Identifiable Information (PII) from the generator.
     * @param match
     * @returns string;
     */
    private redactText;
    /**
     * Generators
     * Functions to generate mock PII data including
     * iban, passports, emails, addresses, ssn, drivers license, etc.
     */
    generators: {
        iban(): string;
        passport(): string;
        intPhone(): string;
        address: () => string;
        zipcode(): string;
        state(): string;
        ssn(): string;
        license: () => string;
        phone(): string;
        cc(): string;
        email(): string;
    };
}
//# sourceMappingURL=redactor.class.d.ts.map