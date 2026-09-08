import BorrowingCalculator from "./BorrowingCalculator";

const calculator = new BorrowingCalculator();

function runConsoleMode() {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Mortgage Borrowing Power Calculator");
    console.log("===================================");

    rl.question("Gross Annual Income: $", (income) => {
        rl.question("Number of Dependents: ", (dependents) => {
            rl.question("Declared Monthly Expenses: $", (expenses) => {
                rl.question(
                    "Total Credit Card Limits: $",
                    async (creditLimits) => {
                        // Banks assess loans using base rate + buffer for safety
                        const assessmentRate =
                            BorrowingCalculator.INTEREST_RATE +
                            BorrowingCalculator.ASSESSMENT_RATE_BUFFER;

                        const result = await calculator.calculateBorrowingPower(
                            parseFloat(income),
                            parseInt(dependents),
                            parseFloat(expenses),
                            parseFloat(creditLimits),
                            assessmentRate,
                        );

                        console.log("\n--- Calculation Summary ---");
                        console.log(
                            `Maximum Borrowing Power at ${BorrowingCalculator.INTEREST_RATE}%: $${result.maxLoanAmount.toLocaleString()}`,
                        );
                        console.log(
                            `Assumed Monthly Mortgage Repayment: $${result.monthlyRepayment.toLocaleString()} over 30 years`,
                        );

                        rl.close();
                    },
                );
            });
        });
    });
}

if (require.main === module) {
    runConsoleMode();
}
