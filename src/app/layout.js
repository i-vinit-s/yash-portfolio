import "./globals.css";

export const metadata = {
  title: "Yash — Portfolio",
  description: "ECE Student Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
