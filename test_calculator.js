/**
 * Borrowing Power Calculator Test Suite
 */

const assert = require("assert");
const BorrowingCalculator = require("./borrowingCalculator");

let calculator;

describe("Term Deposit Calculator Tests", () => {
    beforeEach(() => {
        calculator = new BorrowingCalculator();
    });

    describe("when given valid values", () => {
        it("should calculate borrowing power for standard values", async () => {
            const result = await calculator.calculateBorrowingPower(
                120000,
                2,
                3000,
                10000,
                7.5,
            );

            assert.ok(
                result.maxLoanAmount > 0,
                "Should yield a positive borrowing power amount",
            );
            assert.strictEqual(result.monthlyRepayment, 4600);
        });

        it("should return zero when applicant cannot afford repayments", async () => {
            const result = await calculator.calculateBorrowingPower(
                12000,
                2,
                2000,
                10000,
                7.5,
            );

            assert.strictEqual(result.maxLoanAmount, 0);
            assert.strictEqual(result.monthlyRepayment, 0);
        });
    });

    describe("when given invalid values", () => {
        it("raises an error when given negative income", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        -120000,
                        2,
                        3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given negative dependents", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        -2,
                        3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given negative expenditure", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        2,
                        -3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given negative credit limit", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        2,
                        3000,
                        -10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given non-numeric income", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        "aaa",
                        2,
                        3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given non-numeric dependents", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        "aaa",
                        3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given non-numeric expenditure", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        2,
                        "aaa",
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when given non-numeric credit limit", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        2,
                        3000,
                        "aaa",
                        7.5,
                    ),
            );
        });

        it("raises an error when missing income", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        "",
                        2,
                        3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when missing dependents", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        "",
                        3000,
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when missing expenditure", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        2,
                        "",
                        10000,
                        7.5,
                    ),
            );
        });

        it("raises an error when missing credit limit", async () => {
            assert.rejects(
                async () =>
                    await calculator.calculateBorrowingPower(
                        120000,
                        2,
                        3000,
                        "",
                        7.5,
                    ),
            );
        });
    });
});
