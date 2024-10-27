import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: fromatCurrency");
//Basic cases
console.log("converts cents to dollars");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

//Edge cases
console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up >=5");
if (formatCurrency(2200.5) === "22.01") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up <5");
if (formatCurrency(2200.4) === "22.00") {
  console.log("passed");
} else {
  console.log("failed");
}
