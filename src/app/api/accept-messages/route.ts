import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { User } from "next-auth";


export async function POST(request: Request) {

    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {
            status: 401
        })
    }
    const userId = user._id;

    const { acceptMessage } = await request.json();
    try {

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessage },
            { new: true }
        );
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update user status to accept message"
            }, {
                status: 401
            })
        }
        return Response.json({
            success: true,
            message: "Message accept user status updated successfully"
        }, {
            status: 200
        })
    } catch (error) {
        console.log("Failed to update user status to accept message: ", error);
        return Response.json({
            success: false,
            message: "Failed to update user status to accept message"
        }, {
            status: 500
        })
    }
}

export async function GET(request: Request) {

    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {
            status: 401
        })
    }
    const userId = user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }
        return Response.json({
            success: true,
            message: "User found",
            data: user
        }, {
            status: 200
        })
    } catch (error) {
        console.log("Failed to get user: ", error);
        return Response.json({
            success: false,
            message: "Failed to get user"
        }, {
            status: 500
        })
    }
}