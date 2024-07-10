import { getProviders, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function SignIn() {
    return redirect("/");
}