import { jwtDecode } from "jwt-decode";
import { BaseApi } from "./baseApi";

const authApiIns = new BaseApi("/auth");

type SessionParams = {
    accessToken: string;
};

export const setSession = (sessionParams: SessionParams) => {
    const apiInstance = authApiIns.getApiInstance();

    if (sessionParams === null) {
        delete apiInstance.defaults.headers.common.Authorization;
        return;
    }

    const { accessToken } = sessionParams;

    apiInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
};

export const validateExpToken = (token: string) => {
    const decode = jwtDecode<any>(token);

    const currentDate = new Date();
    const expDate = new Date(decode.exp);

    return currentDate > expDate;
};