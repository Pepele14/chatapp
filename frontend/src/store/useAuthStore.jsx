import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true, //at every refresh we can check whether user is auth or not

checkAuth: async() => {
    try{
        const res = await axiosInstance.get("/auth/check");

        set({authUser:res.data})
    }catch(error){
        console.log("Error in checkAuth:", error)
        set({authuser:null})

    } finally{
        set({isCheckingAuth:false})
    }
}
}))