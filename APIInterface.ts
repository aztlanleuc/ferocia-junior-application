export default class APIInterface {
    static BASE_API_URL = "http://localhost:3000";
    static TAX_API_PATH = "/api/tax";
    static HEM_API_PATH = "/api/hem";

    static REQUEST_OPTIONS = {
        method: "GET",
        headers: {
            Authorization: "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789",
        },
    };

    static async getTax(income: number): Promise<number> {
        const requestUrl =
            APIInterface.BASE_API_URL +
            APIInterface.TAX_API_PATH +
            "?income=" +
            income;

        let response;

        response = await fetch(requestUrl, APIInterface.REQUEST_OPTIONS); // TODO: error handling
        const body = await response.json();

        return body.tax;
    }

    static async getHEM(income: number, dependents: number): Promise<number> {
        const requestUrl =
            APIInterface.BASE_API_URL +
            APIInterface.HEM_API_PATH +
            "?income=" +
            income +
            "&dependents=" +
            dependents;

        let response;

        response = await fetch(requestUrl, APIInterface.REQUEST_OPTIONS); // TODO: error handling
        const body = await response.json();

        return body.hem;
    }
}
