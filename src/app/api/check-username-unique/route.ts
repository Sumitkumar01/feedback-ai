import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/singUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {

    // if(request.method !== "GET") {
    //     return Response.json(
    //         {
    //             success: false,
    //             message: "only GET requests are allowed",
    //         },
    //         { status: 405 }
    //     );
    // }

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username"),
        };
        const result = UsernameQuerySchema.safeParse(queryParams);
        // console.log(result);
        if (!result.success) {
            const userNameError = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        userNameError?.length > 0
                            ? userNameError.join(", ")
                            : "Internal Query Parameters",
                },
                { status: 400 }
            );
        }

        const { username } = result.data;
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username is not available",
                },
                { status: 400 }
            );
        }
        return Response.json(
            {
                success: true,
                message: "Username is available",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking if username is unique: ", error);
        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
