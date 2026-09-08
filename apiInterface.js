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

module.exports = APIInterface;
