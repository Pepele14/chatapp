import User from "../models/user.model.js"
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password") //find all users where id is not equal to those that are logged in

        res.status(200).json(filteredUsers)
    } catch(error){
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error"})

    }
}

export const getMessages = async(req, res) => {
    try{
      const { id:userToChatId }= req.params
      const myId = req.user._id;

      //find all messages where I am the sender and the receiver is the other user
      const messages = await Message.find({
        $or:[
            {senderId:myId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId:myId}
        ]
      })
      res.status(200).json(messages)
    } catch (error){
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" })

    }
}

export const sendMessage = async (req, res) => {
    try{
        const { text, image } = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}