import './globals.css';

export const metadata = {
  title: 'TaskCommander',
  description: 'Take command of your urgent tasks',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Вставляем прямой плагин Tailwind, который работает всегда и везде без сборщиков */}
        <script src="https://tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
