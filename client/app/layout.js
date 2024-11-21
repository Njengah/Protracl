import "./globals.css";

export const metadata = {
  title: "Protracl",
  description: "Project Task Tracking Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
