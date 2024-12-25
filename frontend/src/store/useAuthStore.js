import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true, //at every refresh we can check whether user is auth or not
    onlineUsers: [],

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
},

logout: async () => {
    try{
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out succesfully")
    } catch(error){
        toast.error(error.response.data.message)

    }
},

updateProfile: async(data) => {
    set({ isUpdatingProfile: true});
    try{
     const res = await axiosInstance.put("/auth/update-profile", data);
     set({authUser: res.data});
     toast.success("Profile updated successfully");
    }catch(error){
        console.log("error in update profile:", error);
        toast.error(error.response.data.message)
    }
},
}))