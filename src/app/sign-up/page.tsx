import CardCompact from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";
import { sign } from "crypto";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div className="flex flex-1 justify-center items-center">
            <CardCompact
                title="Sign Up"
                description="Create a new account to get started"
                className="w-full max-w-[420px] animate-fade-in-from-top"
                content={<SignUpForm />}
                footer={
                    <Link className="text-sm text-muted-foreground" href={signInPath()}>
                        Already have an account? Sign In now.
                    </Link>
                }
            />
        
        </div>
    )
}

export default SignUpPage;