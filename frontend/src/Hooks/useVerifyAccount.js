import create from "zustand";
import { devtools } from "zustand/middleware";
import sendRequest from "../Api Call/apiCalls";
const VerifyAccount = (set) => ({
    loading: false,
    error: "",
    success: false,
    verifyAccount :async (data) => {
        set({ loading: true });
        try {
            const response = await sendRequest(
                "http://localhost:3330/user/verifyAccount",
                "POST",
                data
            );
            set({ loading: false, success: true });
            return response;
        } catch (error) {
            set({ loading: false, error: error });
        }
    },
});
export const useVerifyAccount = create(devtools(VerifyAccount));
