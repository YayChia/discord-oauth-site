import './globals.css'
import AuthProvider from "./auth-provider";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html><body><AuthProvider>{children}</AuthProvider></body></html>
  );
}