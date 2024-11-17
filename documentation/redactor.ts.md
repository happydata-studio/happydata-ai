# Redactor Class Documentation

The `Redactor` class is designed to help you manage sensitive data by redacting Personally Identifiable Information (PII) from text and replacing it with mock data. This is particularly useful when you need to send data to a third-party service, such as a Language Model (LLM), without exposing real PII. After processing, you can refill the text with the original PII.

## Features

- **Redact PII**: Automatically identifies and replaces sensitive data with mock data.
- **Refill PII**: Replaces mock data with the original PII.
- **Customizable Generators**: Provides methods to generate mock data for various types of PII.

## Usage

### Step 1: Get Your Content

First, obtain the text content that you want to redact. This could be any string containing sensitive information.

### Step 2: Redact the Content

Use the `redact` method to replace PII with mock data.

```typescript
const redactor = new Redactor();
const originalText = "John Doe, 123-456-7890, john.doe@example.com, 123 Main St, Anytown, CA 12345";
const redactedText = redactor.redact(originalText);

console.log(redactedText);
// Output: "John Doe, 987-654-3210, abc123@example.com, 12345 Happy Dr., Pine Forrest, CA 54321"
```

### Step 3: Send to LLM with Mock PII

Send the `redactedText` to your LLM or any other service that requires the data without exposing real PII.

### Step 4: Refill with Original PII

Once you receive a response from the LLM, use the `refill` method to replace the mock data with the original PII.

```typescript
const responseFromLLM = "Processed text with mock data";
const refilledText = redactor.refill(responseFromLLM);

console.log(refilledText);
// Output: "Processed text with original data"
```

## Methods

### `redact(text: string): string`

- **Description**: Replaces PII in the provided text with mock data.
- **Parameters**: 
  - `text`: The input string containing PII.
- **Returns**: A string with PII replaced by mock data.

### `refill(text: string): string`

- **Description**: Replaces mock data in the provided text with the original PII.
- **Parameters**: 
  - `text`: The input string containing mock data.
- **Returns**: A string with mock data replaced by the original PII.

## Mock Data Generators

The `Redactor` class includes several generator functions to create mock data for different types of PII:

- **Phone Numbers**: `generators.phone()`
- **Email Addresses**: `generators.email()`
- **Addresses**: `generators.address()`
- **Social Security Numbers**: `generators.ssn()`
- **Driver's License Numbers**: `generators.license()`
- **Credit Card Numbers**: `generators.cc()`
- **Passport Numbers**: `generators.passport()`
- **IBAN Numbers**: `generators.iban()`
- **International Phone Numbers**: `generators.intPhone()`

These generators are used internally by the `redact` method to replace PII with mock data.

## Example

Here's a complete example demonstrating the use of the `Redactor` class:

```typescript
const redactor = new Redactor();
const originalText = "Jane Smith, 555-123-4567, jane.smith@example.com, 456 Elm St, Springfield, IL 62704";
const redactedText = redactor.redact(originalText);

console.log("Redacted Text:", redactedText);
// Example Output: "Jane Smith, 987-654-3210, abc123@example.com, 12345 Happy Dr., Pine Forrest, CA 54321"

// Simulate a response from the LLM that includes some of the mock PII
const responseFromLLM = "The user with phone number 987-654-3210 and email abc123@example.com has been processed.";

// Refill the response with the original PII
const refilledText = redactor.refill(responseFromLLM);

console.log("Refilled Text:", refilledText);
// Output: "The user with phone number 555-123-4567 and email jane.smith@example.com has been processed."
```
