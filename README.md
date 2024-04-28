# magicui-helpers

This package provides a collection of useful React hooks and utilities for building UI components.

## Table of Contents

- [Utilities](#utilities)
  - [calculate](#calculate)
  - [character](#character)
  - [class-name](#class-name)
  - [datetime](#datetime)
  - [deep-merge](#deep-merge)
  - [group-by](#group-by)
  - [n-formatter](#n-formatter)
  - [nanoid](#nanoid)
  - [time-ago](#time-ago)
  - [trim](#trim)
  - [truncate](#truncate)
  - [urls](#urls)

## Utils Examples

### calculate

```javascript
import { calculate } from "magicui-helpers";

const result1 = calculate("2 + 3 * 4"); // 14
console.log(result1);

const result2 = calculate("(2 + 3) * 4"); // 20
console.log(result2);

const result3 = calculate("10 / (2 + 3)"); // 2
console.log(result3);
```

### class Name

```javascript
import React from "react";
import { cn } from "magicui-helpers";

const App = ({ isActive, className }) => {
  const containerClasses = cn("container", {
    "is-active": isActive,
    "has-border": true,
  });

  return <div className={cn(containerClasses, className)}>...</div>;
};
```

### datetime

```javascript
import {
  getDateTimeLocal,
  parseDateTime,
  formatDate,
  formatDateTime,
  getFirstAndLastDay,
  getLastDayOfMonth,
  getAdjustedBillingCycleStart,
  getBillingStartDate,
} from "magicui-helpers";
```

### getDateTimeLocal

This function takes an optional timestamp parameter of type Date and returns a string representation of the date and time in the local time zone.
Example:

```javascript
const timestamp = new Date("2023-06-10T12:30:00Z");
const localDateTime = getDateTimeLocal(timestamp);
console.log(localDateTime);
// Output: "2023-06-10T08:30" (assuming the local time zone is UTC-4)
```

### parseDateTime

This function takes a str parameter of type Date or string and returns a Date object. If the input is already a Date object, it is returned as is. If the input is a string, it is parsed using the chrono-node library.

```javascript
const dateString = "2023-06-10";
const date = parseDateTime(dateString);
console.log(date);
```

### formatDate

This function takes a `datetime parameter of type Date` or string and returns a formatted date string in the `format` "Month Day, Year".

```javascript
const datetime = new Date("2023-06-10T12:30:00Z");
const formattedDate = formatDate(datetime);
console.log(formattedDate);
// Output: "June 10, 2023"
```

### formatDateTime

This function takes a `datetime` parameter of type Date or string and returns a formatted date and time string in the format "Mon Day, Year, HH:MM AM/PM".

```javascript
const datetime = new Date("2023-06-10T12:30:00Z");
const formattedDateTime = formatDateTime(datetime);
console.log(formattedDateTime);
// Output: "Jun 10, 2023, 8:30 AM" (assuming the local time zone is UTC-4)
```

### getFirstAndLastDay

This function takes a day parameter of type number representing a day of the month and returns an object with the firstDay and lastDay properties. The firstDay represents the first occurrence of the specified day in the current or previous month, and the lastDay represents the last occurrence of the specified day in the current or next month.

```javascript
const day = 15;
const { firstDay, lastDay } = getFirstAndLastDay(day);
console.log(firstDay);
// Output: Date object representing the first occurrence of the 15th day in the current or previous month
console.log(lastDay);
// Output: Date object representing the last occurrence of the 15th day in the current or next month
```

### getLastDayOfMonth

This function returns the last day of the current month as a number.

```javascript
const lastDay = getLastDayOfMonth();
console.log(lastDay);
// Output: Number representing the last day of the current month
```

### getAdjustedBillingCycleStart

This function takes a `billingCycleStart` parameter of type number representing the billing cycle start day and returns an adjusted billing cycle start day based on the number of days in the current month. If the billing cycle start day is greater than the last day of the month, it is adjusted to the last day of the month.

```javascript
const billingCycleStart = 31;
const adjustedBillingCycleStart =
  getAdjustedBillingCycleStart(billingCycleStart);
console.log(adjustedBillingCycleStart);
// Output: Adjusted billing cycle start day based on the current month
```

### getBillingStartDate

This function takes a `billingCycleStart` parameter of type `number` representing the billing cycle start day and returns a Date object representing the billing start date based on the current date and the billing cycle start day.

```javascript
const billingCycleStart = 15;
const billingStartDate = getBillingStartDate(billingCycleStart);
console.log(billingStartDate);
// Output: Date object representing the billing start date based on the current date and billing cycle start day
```

### deepMerge

This `utility function`, named deepMerge, performs a deep merge of two or more objects. `It recursively merges` the properties of the source objects into the target object, creating a new object that combines all the properties.

```javascript
import { deepMerge } from "@/utils/deepMerge";

const obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};

const obj2 = {
  b: {
    d: 4,
    e: 5,
  },
  f: 6,
};

const mergedObj = deepMerge(obj1, obj2);
console.log(mergedObj);
/*
Output:
{
  a: 1,
  b: {
    c: 2,
    d: 4,
    e: 5,
  },
  f: 6,
}
*/
```

### groupBy

This utility function, named `groupBy`, allows you to group an array of objects based on a specified key or a key function. It returns an object where the keys are the unique values of the specified key, and the values are arrays of objects that have the corresponding key value.

```javascript
import { groupBy } from "@/utils/groupBy";

interface Person {
  name: string;
  age: number;
  city: string;
}

const people: Person[] = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "London" },
  { name: "Charlie", age: 25, city: "New York" },
  { name: "David", age: 35, city: "London" },
  { name: "Eve", age: 30, city: "Paris" },
];

const groupedByAge = groupBy(people, (person) => person.age);
console.log(groupedByAge);
/*
Output:
{
  '25': [
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Charlie', age: 25, city: 'New York' },
  ],
  '30': [
    { name: 'Bob', age: 30, city: 'London' },
    { name: 'Eve', age: 30, city: 'Paris' },
  ],
  '35': [
    { name: 'David', age: 35, city: 'London' },
  ],
}
*/

const groupedByCity = groupBy(people, (person) => person.city);
console.log(groupedByCity);
/*
Output:
{
  'New York': [
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Charlie', age: 25, city: 'New York' },
  ],
  'London': [
    { name: 'Bob', age: 30, city: 'London' },
    { name: 'David', age: 35, city: 'London' },
  ],
  'Paris': [
    { name: 'Eve', age: 30, city: 'Paris' },
  ],
}
*/
```

### nFormatter

The nFormatter function is a utility function that formats a number with abbreviations (e.g., 1.2K, 3.5M, 1.2B) for better readability, especially when dealing with large numbers.

```javascript
import { nFormatter } from "magicui-helpers";

console.log(nFormatter(1234)); // Output: "1.2K"
console.log(nFormatter(12345678, { digits: 2 })); // Output: "12.35M"
console.log(nFormatter(123456789012, { full: true })); // Output: "123,456,789,012"
```

### nanoid

The `nanoid` function is a utility function that generates a unique, secure, URL-friendly, and case-sensitive string identifier. It is a wrapper around the `customAlphabet` function from the `nanoid` library.

```javascript
import { nanoid } from "magicui-helpers";

console.log(nanoid()); // Output: e.g., "Xn7qVg2"
console.log(nanoid(10)); // Output: e.g., "Zm9qVg2Xn7"
```

### Time Ago

The `timeAgo`` function is a utility function that formats a given timestamp as a human-readable string representing how much time has passed since that timestamp. It provides options to display the time difference with or without the "ago" suffix.

```javascript
import { timeAgo } from "magicui-helpers";

console.log(timeAgo(null)); // Output: "Never"
console.log(timeAgo(new Date())); // Output: "Just now"
console.log(timeAgo(new Date(Date.now() - 60 * 1000))); // Output: "1m"
console.log(
  timeAgo(new Date(Date.now() - 24 * 60 * 60 * 1000), { withAgo: true })
); // Output: "1d ago"
console.log(timeAgo(new Date(2023, 0, 1))); // Output: "Jan 1"
console.log(timeAgo(new Date(2022, 0, 1))); // Output: "Jan 1, 2022"
```

### Trim

The `trim` function is a utility function that trims whitespace from the beginning and end of a string. If the input is not a string, it returns the input as-is.

```javascript
import { trim } from "magicui-helpers";

// Example 1: Trimming user input
const userInput = "   hello@example.com   ";
const trimmedEmail = trim(userInput);
console.log(trimmedEmail); // Output: "hello@example.com"

// Example 2: Handling form data
const formData = {
  name: "  John Doe  ",
  age: "  30  ",
  address: "   123 Main St.   ",
};

const cleanedFormData = {
  name: trim(formData.name),
  age: trim(formData.age),
  address: trim(formData.address),
};

console.log(cleanedFormData);
// Output: { name: 'John Doe', age: '30', address: '123 Main St.' }

// Example 3: Non-string input
const number = 42;
const trimmedNumber = trim(number);
console.log(trimmedNumber); // Output: 42
```

### Truncate

The `truncate` function is a utility function that truncates a given string to a specified length and adds an ellipsis (...) at the end if the string is longer than the specified length.

```javascript
import { truncate } from "magicui-helpers";

console.log(truncate("Hello, World!", 7)); // Output: "Hello..."
console.log(truncate("This is a long string", 10)); // Output: "This is a..."
console.log(truncate("Short", 10)); // Output: "Short"
console.log(truncate(null, 5)); // Output: null
console.log(truncate(undefined, 5)); // Output: null
```

### isValidUrl

The isValidUrl function checks whether a given string is a valid URL.

```javascript
import { isValidUrl } from "magicui-helpers";

console.log(isValidUrl("https://example.com")); // Output: true
console.log(isValidUrl("invalid-url")); // Output: false
```

### getUrlFromString

The function returns the input string if it is a valid URL. If the input string contains a dot (.) and no spaces, it tries to create a valid URL by prepending https:// to the string. If the input string is not a valid URL and cannot be converted to one, it returns an empty string.

```javascript
import { getUrlFromString } from "magicui-helpers";

console.log(getUrlFromString("https://example.com")); // Output: "https://example.com"
console.log(getUrlFromString("example.com")); // Output: "https://example.com"
console.log(getUrlFromString("invalid url")); // Output: ""
```

### getSearchParams

The getSearchParams function retrieves the search parameters from a given URL as a key-value object.

```javascript
import { getSearchParams } from "magicui-helpers";

console.log(getSearchParams("https://example.com?foo=bar&baz=qux")); // Output: { foo: "bar", baz: "qux" }
console.log(getSearchParams("https://example.com")); // Output: {}
```

### getSearchParamsWithArray

The function returns an object containing the search parameters as key-value pairs. If a key appears multiple times, its value is stored as an array. If the URL is invalid or has no search parameters, it returns an empty object.

```javascript
import { getSearchParamsWithArray } from "magicui-helpers";

console.log(getSearchParamsWithArray("https://example.com?foo=bar&foo=baz")); // Output: { foo: ["bar", "baz"] }
console.log(getSearchParamsWithArray("https://example.com?foo=bar&baz=qux")); // Output: { foo: "bar", baz: "qux" }
console.log(getSearchParamsWithArray("https://example.com")); // Output: {}
```
