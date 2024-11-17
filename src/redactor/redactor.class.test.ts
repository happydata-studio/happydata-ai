import { Redactor } from './redactor.class';

describe('Redactor', () => {
  let redactor: Redactor;

  beforeEach(() => {
    redactor = new Redactor();
  });

  describe('redact', () => {
    it('should redact phone numbers', () => {
      const input = 'Call me at 123-456-7890';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('123-456-7890');
      expect(redacted).toMatch(/Call me at \d{3}-\d{3}-\d{4}/);
    });

    it('should redact email addresses', () => {
      const input = 'My email is test@example.com';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('test@example.com');
      expect(redacted).toMatch(/My email is [\w\.-]+@[\w\.-]+\.\w+/);
    });

    it('should redact addresses', () => {
      const input = 'I live at 123 Main St, Anytown, NY 12345';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('123 Main St, Anytown, NY 12345');
      expect(redacted).toMatch(/I live at \d+ [a-zA-Z. ]+, [a-zA-Z. ]+, [A-Z]{2} \d{5}/);
    });

    it('should redact SSNs', () => {
      const input = 'My SSN is 123-45-6789';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('123-45-6789');
      expect(redacted).toMatch(/My SSN is \d{3}-\d{2}-\d{4}/);
    });

    it('should redact license numbers', () => {
      const input = 'License number: AB-1234567';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('AB-1234567');
      expect(redacted).toMatch(/License number: [A-Z]{2}-\d{7}/);
    });

    it('should redact credit card numbers', () => {
      const input = 'CC: 1234-5678-9012-3456';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('1234-5678-9012-3456');
      expect(redacted).toMatch(/CC: \d{4}-\d{4}-\d{4}-\d{4}/);
    });

    it('should redact passport numbers', () => {
      const input = 'Passport: AB123456';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('AB123456');
      expect(redacted).toMatch(/Passport: [A-Z]{1,2}\d{6,9}/);
    });

    it('should redact IBAN numbers', () => {
      const input = 'IBAN: GB29NWBK60161331926819';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('GB29NWBK60161331926819');
      expect(redacted).toMatch(/IBAN: [A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}/);
    });

    it('should redact international phone numbers', () => {
      const input = 'Int. Phone: +1 123-456-7890';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('+1 123-456-7890');
      expect(redacted).toMatch(/Int\. Phone: \+\d{1,4} \d{3}-\d{7}/);
    });

    it('should redact international phone numbers MULTIPLE TIMES', () => {
      const input = 'Int. Phone: +1 123-456-7890 and again Int. Phone: +1 123-456-7891';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('+1 123-456-7890');
      expect(redacted).toMatch(/Int\. Phone: \+\d{1,4} \d{3}-\d{7}/);
    });

    it('should redact multiple types of sensitive data in a single text', () => {
      const input = 'Phone: 123-456-7890, Email: test@example.com, SSN: 123-45-6789';
      const redacted = redactor.redact(input);
      expect(redacted).not.toContain('123-456-7890');
      expect(redacted).not.toContain('test@example.com');
      expect(redacted).not.toContain('123-45-6789');
      expect(redacted).toMatch(/Phone: \d{3}-\d{3}-\d{4}, Email: [\w\.-]+@[\w\.-]+\.\w+, SSN: \d{3}-\d{2}-\d{4}/);
    });
  });

  describe('refill', () => {
    it('should replace redacted placeholders with original values', () => {
      const original = 'Phone: 123-456-7890, Email: test@example.com';
      const redacted = redactor.redact(original);
      const refilled = redactor.refill(redacted);
      expect(refilled).toBe(original);
    });
  });

  describe('count', () => {
    it('should return the number of redactions made', () => {
      const input = 'Phone: 123-456-7890, Email: test@example.com, SSN: 123-45-6789';
      redactor.redact(input);
      expect(redactor.count).toBe(3);
    });
  });

  describe('generators', () => {
    it('should generate valid phone numbers', () => {
      const phone = redactor.generators.phone();
      expect(phone).toMatch(/\d{3}-\d{3}-\d{4}/);
    });

    it('should generate valid email addresses', () => {
      const email = redactor.generators.email();
      expect(email).toMatch(/[\w\.-]+@[\w\.-]+\.\w+/);
    });

    it('should generate valid addresses', () => {
      const address = redactor.generators.address();
      expect(address).toMatch(/\d+ [a-zA-Z. ]+, [a-zA-Z. ]+, [A-Z]{2} \d{5}/);
    });

    it('should generate valid SSNs', () => {
      const ssn = redactor.generators.ssn();
      expect(ssn).toMatch(/\d{3}-\d{2}-\d{4}/);
    });

    it('should generate valid license numbers', () => {
      const license = redactor.generators.license();
      expect(license).toMatch(/[A-Z]{2}-\d{8}/);
    });

    it('should generate valid credit card numbers', () => {
      const cc = redactor.generators.cc();
      expect(cc).toMatch(/\d{4}-\d{4}-\d{4}-\d{4}/);
    });

    it('should generate valid passport numbers', () => {
      const passport = redactor.generators.passport();
      expect(passport).toMatch(/[A-Z]{1,2}\d{6,9}/);
    });

    it('should generate valid IBAN numbers', () => {
      const iban = redactor.generators.iban();
      expect(iban).toMatch(/[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}/);
    });

    it('should generate valid international phone numbers', () => {
      const intPhone = redactor.generators.intPhone();
      expect(intPhone).toMatch(/\+\d{1,4} \d{3}-\d{7}/);
    });
  });
});