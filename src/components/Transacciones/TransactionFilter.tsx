import React from "react";

type FilterProps = {
  filter: {
    type: string;
    bankAccountId: string;
    searchTerm: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<{ type: string; bankAccountId: string; searchTerm: string }>>;
  accounts: { id: string; name: string }[];
};

export default function TransactionFilter({ filter, setFilter, accounts }: FilterProps) {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-indigo-900 rounded-lg shadow-lg p-6 mb-6 border border-indigo-700">
      <h3 className="text-lg font-semibold text-white mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Tipo</label>
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
          >
            <option value="all">Todos</option>
            <option value="ingresos">Ingresos</option>
            <option value="gastos">Gastos</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Cuenta</label>
          <select
            value={filter.bankAccountId}
            onChange={(e) => setFilter({ ...filter, bankAccountId: e.target.value })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
          >
            <option value="all">Todas las cuentas</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Buscar</label>
          <input
            type="text"
            value={filter.searchTerm}
            onChange={(e) => setFilter({ ...filter, searchTerm: e.target.value })}
            className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
            placeholder="Buscar por descripción..."
          />
        </div>
      </div>
    </div>
  );
}
