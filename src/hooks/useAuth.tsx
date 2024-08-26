import React from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { setSession } from "../services/auth";
import { UserType } from "../types/user";
import { useAppDispatch } from "../redux/hook";
import { saveUserInfo } from "../redux/features/user/userSlice";

type AuthInfo = {
    accessToken: string;
    userInfo: UserType;
};

type JWTDecode = {
    _id: string;
    iat: number;
    exp: number;
};

const useAuth = () => {
    const [cookies, setCookie] = useCookies(["accessToken", "userInfo"]);

    const dispatch = useAppDispatch();

    const whoIAm = () => {
        if (cookies["userInfo"]) {
            const userInfo = cookies["userInfo"];
            dispatch(saveUserInfo(userInfo));
        }
    };

    const saveAuthInfo = (authInfo: AuthInfo) => {
        const { accessToken, userInfo } = authInfo;

        const decode = jwtDecode<JWTDecode>(accessToken);

        let diff = (decode.exp * 1000 - new Date().getTime()) / 1000;
        diff /= 60 * 60;

        const cookieMaxAge = Math.abs(Math.round(diff)) * 60 * 60;

        setCookie("accessToken", accessToken, { maxAge: cookieMaxAge });

        setCookie("userInfo", JSON.stringify(userInfo), { maxAge: cookieMaxAge });

        setSession({ accessToken });
    };

    const initialization = () => {
        whoIAm();
        setSession({ accessToken: cookies["accessToken"] });
    };

    const isLogin = () => {
        return !!cookies["accessToken"];
    };

    const getUserId = (): string => {
        const accessToken = cookies["accessToken"];
        return jwtDecode<JWTDecode>(accessToken)._id;
    };

    return { whoIAm, isLogin, saveAuthInfo, initialization, getUserId };
};

export default useAuth;