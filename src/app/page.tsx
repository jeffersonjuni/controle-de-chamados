export default function Home() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">

      <div className="bg-surface p-10 rounded-xl border border-border">

        <h1 className="text-white text-3xl font-bold">
          Sistema de Chamados
        </h1>

        <p className="text-secondary mt-3">
          Interface inicial do sistema
        </p>

        <button className="mt-6 bg-primary hover:bg-primaryHover text-white px-5 py-2 rounded-lg">
          Criar chamado
        </button>

      </div>

    </div>
  )
}