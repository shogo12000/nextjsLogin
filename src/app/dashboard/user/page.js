'use client'; // Certifica-se de que o componente é tratado como Client Component

import { useRouter } from 'next/navigation';

export default function User() {
  const router = useRouter();  // Hook para controlar navegação

  const btnLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) { 
      // Redireciona para a página inicial após o logout
      router.push('/');
    } else {
      console.error('Erro ao realizar o logout');
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard!</h1>
      
      <button onClick={btnLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </main>
  );
}
