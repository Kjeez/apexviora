import './globals.css';

export const metadata = {
  title: 'Apexviora — Wooden Packaging Solutions',
  description: 'Custom wooden packaging solutions for a stronger, safer and more sustainable supply chain.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
