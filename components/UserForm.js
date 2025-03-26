"use client";

import { useState } from "react";

export default function UserForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("Usuário adicionado com sucesso!");
      setFormData({ email: "", password: "" });
    } else {
      setMessage("Erro ao adicionar usuário.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Adicionar Usuário
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
