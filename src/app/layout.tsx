import '../styles/global.css';

export const metadata = {
  title: 'Sistema de Controle de Chamados',
  description: 'Aplicação corporativa de help desk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
