"use client";

import { supabase } from "@/lib/supabaseClient";
import { Plan } from "@/types/plan";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DashboardContentProps {
  user: User;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("plans")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao buscar planos:", error.message);
        } else {
          setPlans(data || []);
        }
      } catch (err) {
        console.error("Erro inesperado ao buscar planos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [user.id]);

  const handleCreatePlan = () => {
    router.push("/dashboard/plans/create");
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height={40} width={250} />
        <Skeleton height={45} width={180} />
        <Skeleton height={200} count={3} />
      </div>
    );
  }

  return (
    <div className="p-6 mt-16 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Olá, {user.name?.split(" ")[0]} 👋 <br />
          <span className="text-lg font-normal text-muted-foreground">
            Aqui estão seus planos de aula
          </span>
        </h1>

        <button
          onClick={handleCreatePlan}
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Criar novo plano <Image src="/icons/add.svg" alt="add icon" width={15} height={15} />
        </button>
      </div>

      {plans.length === 0 ? (
        <p className="text-muted-foreground mt-4 text-center min-h-2/4">Nenhum plano criado ainda.</p>
      ) : (
        <table className="w-full mt-4 border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Tema</th>
              <th className="border border-gray-300 p-2 text-left">Objetivo</th>
              <th className="border border-gray-300 p-2 text-left">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr
                key={plan.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => router.push(`/dashboard/plans/${plan.id}`)}
              >
                <td className="border border-gray-300 p-2 font-medium">{plan.theme}</td>
                <td className="border border-gray-300 p-2">{plan.learning_objective}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(plan.created_at).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
