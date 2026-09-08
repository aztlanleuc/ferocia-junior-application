class APIInterface {
    static BASE_API_URL = "http://localhost:3000";
    static TAX_API_PATH = "/api/tax";
    static HEM_API_PATH = "/api/hem";

    static REQUEST_OPTIONS = {
        method: "GET",
        headers: {
            Authorization: "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789",
        },
    };

    static async getTax(income) {
        const requestUrl =
            APIInterface.BASE_API_URL +
            APIInterface.TAX_API_PATH +
            "?income=" +
            income;

        let response;

        response = await fetch(requestUrl, APIInterface.REQUEST_OPTIONS);
        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message);
        }

        return body.tax;
    }

    static async getHEM(income, dependents) {
        const requestUrl =
            APIInterface.BASE_API_URL +
            APIInterface.HEM_API_PATH +
            "?income=" +
            income +
            "&dependents=" +
            dependents;

        let response;

        response = await fetch(requestUrl, APIInterface.REQUEST_OPTIONS);
        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message);
        }

        return body.hem;
    }
}

class BorrowingCalculator {
    static LOAN_TERM_MONTHS = 360; // 30 Years
    static INTEREST_RATE = 7.0; // 7.0% baseline interest rate
    static ASSESSMENT_RATE_BUFFER = 3.0; // 3.0% buffer added to interest rates

    async calculateBorrowingPower(
        income,
        dependents,
        expenses,
        creditLimits,
        annualAssessmentRate,
    ) {
        // 1. Calculate Net Monthly Income after tax deductions
        const annualTax = await APIInterface.getTax(income);
        const netMonthlyIncome = (income - annualTax) / 12;

        // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
        const baselineHEM = await APIInterface.getHEM(income, dependents);
        const totalLivingExpenses = Math.max(expenses, baselineHEM);

        // 3. Calculate credit card liability (~3% of total limits)
        const creditCardLiability = creditLimits * 0.03;

        // 4. Calculate monthly repayment capacity
        const maxMonthlyRepayment =
            netMonthlyIncome - totalLivingExpenses - creditCardLiability;

        // Return early if user cannot afford a loan at all
        if (maxMonthlyRepayment <= 0) {
            return { maxLoanAmount: 0, monthlyRepayment: 0 };
        }

        // 5. Calculate the monthly interest rate
        const monthlyRate = annualAssessmentRate / 100 / 12;

        // 6. Calculate maximum borrowing power using the following formula:
        // P = M * (1 - (1 + R)^-N) / R
        const maxLoanAmount =
            maxMonthlyRepayment *
            ((1 -
                Math.pow(
                    1 + monthlyRate,
                    -BorrowingCalculator.LOAN_TERM_MONTHS,
                )) /
                monthlyRate);

        return {
            maxLoanAmount: Number(maxLoanAmount.toFixed(2)),
            monthlyRepayment: Number(maxMonthlyRepayment.toFixed(2)),
        };
    }
}

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

module.exports = BorrowingCalculator;
