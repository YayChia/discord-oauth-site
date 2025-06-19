import './globals.css';
import AuthProvider from '../components/AuthProvider'; // adjust path if needed

export const metadata = {
  title: "Your App",
  description: "OAuth2 App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
