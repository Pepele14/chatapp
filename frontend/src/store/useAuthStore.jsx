import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

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
},

signup: async(data) => {
    set({ isSigningUp: true})
    try {
        const res = await axiosInstance.post("/auth/signup", data);
                set({ authUser: res.data });
                toast.success("Account created successfully")
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        set ({ isSigningUp : false})
    }
}
}))