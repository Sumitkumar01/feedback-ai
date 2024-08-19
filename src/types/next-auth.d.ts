import 'next-auth';
import { User } from '../models/User.model';


declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        messages?: Message[]
    }
    interface Session {
        user: {
            _id?: string;
            username?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            messages?: Message[];
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        messages?: Message[]
    }
}