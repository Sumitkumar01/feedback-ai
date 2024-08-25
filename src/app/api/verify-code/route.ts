import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";



export async function POST(request: Request) {
    await dbConnect();

    try {

        const { username, verifyCode } = await request.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }
        const isVerifyCodeValid = user.verifyCode === verifyCode;
        const isVerifyCodeExpired = new Date(user.verifyCodeExpires) > new Date();
        if (isVerifyCodeValid && isVerifyCodeExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully",
                },
                { status: 200 }
            );
        } else if (!isVerifyCodeExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verify code expired, please sign up again",
                },
                { status: 400 }
            );

        } else {
            return Response.json(
                {
                    success: false,
                    message: "Verify code invalid",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying username: ", error);
        return Response.json(
            { success: false, message: "Error verifying username" },
            { status: 500 }
        );
    }
}