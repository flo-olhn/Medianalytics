import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result?.ok) {
            window.location.href = '/dashboard';
        } else {
            alert('Failed to sign in');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
    );
}