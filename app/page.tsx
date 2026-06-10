import { redirect } from 'next/navigation';

// The prototype starts at the sign-in screen; authenticated users are
// forwarded to /dashboard by the login page itself.
export default function HomePage() {
  redirect('/login');
}
