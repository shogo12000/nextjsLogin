import UserForm from "../../components/UserForm";
 
import { neon } from '@neondatabase/serverless';

export default function Home() {

  async function create(formData ) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
    // Insert the comment from the form into the Postgres database
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Adicionar Usuário </h1>
      <UserForm />
    </main>
  );
}
