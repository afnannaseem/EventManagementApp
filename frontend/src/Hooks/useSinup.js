import create from 'zustand';
import { devtools } from 'zustand/middleware';
import sendRequest from '../Api Call/apiCalls';
const sinUp = (set) => ({
    loading: false,
    error: '',
    success: false,
    signUp: async (data) => {
        set({ loading: true });
        try {
            const response = await sendRequest('http://localhost:3330/user/signup','POST', data);
        set({ loading: false, success: true });
        return response;
        } catch (error) {
        set({ loading: false, error: error });
        }
    },
});
const useSignup = create(devtools(sinUp));
export default useSignup;
