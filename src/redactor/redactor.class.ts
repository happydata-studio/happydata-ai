export class Redactor {
  private text: string = "";

  // Regexes for sensitive data
  private PHONE_REGEX = /\d{3}-\d{3}-\d{4}/g;
  private EMAIL_REGEX = /[\w\.-]+@[\w\.-]+\.\w+/g;
  private ADDRESS_REGEX =
    /(?:\d+ )?[a-zA-Z. ]+(?:,\s?[a-zA-Z. ]+)?, [A-Z]{2} \d{5}(-\d{4})?/g;
  private SSN_REGEX = /\d{3}-\d{2}-\d{4}/g;
  private LICENSE_REGEX = /[a-zA-Z]{2}-\d{4,8}/g;
  private CC_REGEX = /\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}/g;
  private PASSPORT_REGEX = /[A-Z]{1,2}\d{6,9}/g;
  private IBAN_REGEX = /[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}/g;
  private INTL_PHONE_REGEX = /\+\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}/g;

  private redactions: Map<string, string> = new Map();

  constructor() {
    this.redactText = this.redactText.bind(this);
  }

  public get count(): number {
    return this.redactions.size;
  }

  public redact(text: string): string {
    this.text = text;
    this.text = this.text.replace(this.PHONE_REGEX, this.redactText);
    this.text = this.text.replace(this.EMAIL_REGEX, this.redactText);
    this.text = this.text.replace(this.ADDRESS_REGEX, this.redactText);
    this.text = this.text.replace(this.SSN_REGEX, this.redactText);
    this.text = this.text.replace(this.LICENSE_REGEX, this.redactText);
    this.text = this.text.replace(this.CC_REGEX, this.redactText);
    this.text = this.text.replace(this.PASSPORT_REGEX, this.redactText);
    this.text = this.text.replace(this.IBAN_REGEX, this.redactText);
    this.text = this.text.replace(this.INTL_PHONE_REGEX, this.redactText);

    return this.text;
  }

  /**
   * Refills (rehydrates) any Mock PII with original PII
   * This function can take any string, find the mock PII and replace
   * it with the original PII.
   * @param text
   * @returns string
   */
  public refill(text: string): string {
    this.redactions.forEach((value, key) => {
      text = text.replace(key, value);
    });
    return text;
  }

  /**
   * Redacting Text
   * Identifies any matches and replaces them with the corresponding mock Personally Identifiable Information (PII) from the generator.
   * @param match
   * @returns string;
   */

  private redactText(match: string): string {
    let placeholder = "";

    if (this.PHONE_REGEX.test(match)) {
      placeholder = this.generators.phone();
    } else if (this.EMAIL_REGEX.test(match)) {
      placeholder = this.generators.email();
    } else if (this.ADDRESS_REGEX.test(match)) {
      placeholder = this.generators.address();
    } else if (this.SSN_REGEX.test(match)) {
      placeholder = this.generators.ssn();
    } else if (this.LICENSE_REGEX.test(match)) {
      placeholder = this.generators.license();
    } else if (this.CC_REGEX.test(match)) {
      placeholder = this.generators.cc();
    } else if (this.PASSPORT_REGEX.test(match)) {
      placeholder = this.generators.passport();
    } else if (this.IBAN_REGEX.test(match)) {
      placeholder = this.generators.iban();
    } else if (this.INTL_PHONE_REGEX.test(match)) {
      placeholder = this.generators.intPhone();
    }

    this.redactions.set(placeholder, match);

    return placeholder;
  }

  /**
   * Generators
   * Functions to generate mock PII data including
   * iban, passports, emails, addresses, ssn, drivers license, etc.
   */

  public generators = {
    // Generate a random IBAN Number
    iban() {
      const countryCode = "GB";
      const checkDigits = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
      const bankCode = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      const accountNumber = Math.floor(Math.random() * 10000000)
        .toString()
        .padStart(7, "0");
      return `${countryCode}${checkDigits}${bankCode}${accountNumber}`;
    },
    // Generate a random Passport Number
    passport() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let passport = letters[Math.floor(Math.random() * letters.length)];
      if (Math.random() > 0.5) {
        passport += letters[Math.floor(Math.random() * letters.length)];
      }
      const digits = Math.floor(
        Math.random() * (999999999 - 100000) + 100000
      ).toString();
      return passport + digits.padStart(9, "0");
    },
    // Generate a random International Phone Number
    intPhone() {
      const countryCode = Math.floor(Math.random() * 999) + 1;
      const areaCode = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      const localNumber = Math.floor(Math.random() * 10000000)
        .toString()
        .padStart(7, "0");
      return `+${countryCode} ${areaCode}-${localNumber}`;
    },
    // Generate a random Address
    address:() => {
      const street = "12345 Happy Dr.";
      const city = "Pine Forrest";
      const state = this.generators.state();
      const zip = this.generators.zipcode();

      return `${street}, ${city}, ${state} ${zip}`;
    },
    // Generate a random Zip code
    zipcode() {
      const zip = [];
      for (let i = 0; i < 5; i++) {
        zip.push(Math.floor(Math.random() * 10));
      }
      return zip.join("");
    },
    // Generate a random State Name
    state() {
      const states = [
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ];

      return states[Math.floor(Math.random() * states.length)];
    },
    // Generate a random Social Security Number
    ssn() {
      const ssn = [];

      for (let i = 0; i < 3; i++) {
        ssn.push(Math.floor(Math.random() * 10));
      }

      ssn.push("-");

      for (let i = 0; i < 2; i++) {
        ssn.push(Math.floor(Math.random() * 10));
      }

      ssn.push("-");

      for (let i = 0; i < 4; i++) {
        ssn.push(Math.floor(Math.random() * 10));
      }

      return ssn.join("");
    },
    // Generate a random Drivers License Number
    license:()=> {
      const state = this.generators.state()
      const number = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0");

      return `${state}-${number}`;
    },
    // Generate a random Phone Number
    phone() {
      let phone = "";
      for (let i = 0; i < 3; i++) {
        phone += Math.floor(Math.random() * 10);
      }
      phone += "-";
      for (let i = 0; i < 3; i++) {
        phone += Math.floor(Math.random() * 10);
      }
      phone += "-";
      for (let i = 0; i < 4; i++) {
        phone += Math.floor(Math.random() * 10);
      }
      return phone;
    },
    // Generate random CC number
    cc() {
      const card = [];

        for (let i = 0; i < 4; i++) {
          card.push(Math.floor(Math.random() * 10));
        }

        card.push("-");

        for (let i = 0; i < 4; i++) {
          card.push(Math.floor(Math.random() * 10));
        }

        card.push("-");

        for (let i = 0; i < 4; i++) {
          card.push(Math.floor(Math.random() * 10));
        }

        card.push("-");

        for (let i = 0; i < 4; i++) {
          card.push(Math.floor(Math.random() * 10));
        }

        return card.join("");
    },
    // Generate random email address
    email() {
      let email = "";
      for (let i = 0; i < 7; i++) {
        email += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
      email += Math.floor(Math.random() * 100) + "@";
      for (let i = 0; i < 7; i++) {
        email += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
      email += ".com";
      return email;
    },
  };
}
