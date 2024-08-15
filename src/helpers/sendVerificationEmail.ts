import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export const sendVerificationEmail = async (
    email: string,
    verifyCode: string,
    username: string
): Promise<ApiResponse> => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify your email",
            react: VerificationEmail({ username, verifyCode }),
        });
        return {
            success: true,
            message: "Verification email sent",
            isAcceptingMessages: true,
        };
    } catch (emailError) {
        console.log("Error sending verification email: ", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
            isAcceptingMessages: true,
        };
    }
};
