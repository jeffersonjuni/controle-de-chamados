import '../styles/global.css';
import AuthProvider from '@/src/providers/session-provider';

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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}