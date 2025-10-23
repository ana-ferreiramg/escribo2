import Header from "@components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div id="root">
      <div className="min-h-screen w-full pt-24">
        <Header />
        <div className="grid min-h-screen grid-cols-12 place-items-center p-6">
          <div className="col-span-full flex justify-center w-full min-w-[348px] max-w-[1040px] flex-col items-center lg:col-span-12">
            <section className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bem-vindo ao PlanAI</h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8">
                Crie planos de aula personalizados de forma rápida e inteligente utilizando IA.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/signup"
                  className="bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition"
                >
                  Começar agora
                </Link>
                <Link
                  href="/about"
                  className="border border-sky-600 text-sky-600 px-6 py-3 rounded-lg font-medium hover:bg-sky-50 transition"
                >
                  Saiba mais
                </Link>
              </div>
            </section>

            <section className="mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col min-h-[180px]">
                <h2 className="text-xl font-semibold mb-2">Geração Automática de Planos</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Crie planos de aula completos em segundos, com objetivos de aprendizagem alinhados à BNCC.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col h-full min-h-[180px]">
                <h2 className="text-xl font-semibold mb-2">Atividades Criativas</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Receba sugestões de atividades lúdicas e interativas que engajam os alunos.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col h-full min-h-[180px]">
                <h2 className="text-xl font-semibold mb-2">Avaliação Simplificada</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Tenha rubricas de avaliação prontas e ajustáveis para acompanhar o desempenho dos alunos.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col h-full min-h-[180px]">
                <h2 className="text-xl font-semibold mb-2">Organização de Conteúdos</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Centralize todos os planos e recursos em um único lugar, de forma prática e intuitiva.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col h-full min-h-[180px]">
                <h2 className="text-xl font-semibold mb-2">Customização Total</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Ajuste objetivos, atividades e avaliação conforme o perfil da sua turma.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col h-full min-h-[180px]">
                <h2 className="text-xl font-semibold mb-2">Interface Intuitiva</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Navegue e crie planos de forma simples e rápida, mesmo sem experiência prévia.
                </p>
              </div>

            </section>
          </div>
        </div>
      </div>
    </div >
  );
}
