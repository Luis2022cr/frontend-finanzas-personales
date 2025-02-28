import { useState, useRef } from "react";
import { PlusCircle, Trash2, CreditCard, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

type BankAccount = {
  id: string;
  name: string;
  balance: number;
  accountNumber: string;
  image?: string;
};

export default function Micuenta() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { id: "1", name: "Cuenta Principal", balance: 5000, accountNumber: "1234-5678-9012-3456", image: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Ahorros", balance: 10000, accountNumber: "9876-5432-1098-7654", image: "/placeholder.svg?height=100&width=100" },
  ]);

  const [newAccount, setNewAccount] = useState<Omit<BankAccount, "id">>({ name: "", balance: 0, accountNumber: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accountImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddAccount = () => {
    if (!newAccount.name || newAccount.balance < 0) {
      alert("Por favor ingresa un nombre y un saldo válido");
      return;
    }
    const accountId = Date.now().toString();
    setAccounts([...accounts, { id: accountId, ...newAccount }]);
    setNewAccount({ name: "", balance: 0, accountNumber: "" });
    if (accountImageInputRef.current) accountImageInputRef.current.value = "";
    setIsModalOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Número de cuenta copiado al portapapeles");
  };

  return (
    <>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Mis Cuentas</h2>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md flex items-center shadow-lg">
            <PlusCircle size={18} className="mr-2" /> Agregar Cuenta
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div key={account.id} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-5 border-l-4 border-cyan-400 transform hover:scale-105">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {account.image && <img src={account.image} alt={account.name} className="w-12 h-12 rounded-full mr-3 object-cover" />}
                  <div>
                    <h3 className="font-semibold text-lg text-white">{account.name}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      <p className="text-sm text-cyan-200 mr-2">{account.accountNumber}</p>
                      <button onClick={() => copyToClipboard(account.accountNumber)} className="text-cyan-200 hover:text-white">
                        <CreditCard size={14} />
                      </button>
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">${account.balance.toLocaleString()}</p>
                  </div>
                </div>
                <button className="text-indigo-200 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal para agregar cuenta */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-lg shadow-lg w-96 relative">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-white">
            <X size={18} />
          </button>
          <h3 className="text-lg font-semibold text-white mb-4">Agregar Nueva Cuenta</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre" value={newAccount.name} onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })} className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white" />
            <input type="text" placeholder="Número de Cuenta" value={newAccount.accountNumber} onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })} className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white" />
            <input type="number" placeholder="Saldo Inicial" value={newAccount.balance} onChange={(e) => setNewAccount({ ...newAccount, balance: Number(e.target.value) })} className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white" />
            <input type="file" accept="image/*" ref={accountImageInputRef} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, (dataUrl) => setNewAccount({ ...newAccount, image: dataUrl }));
            }} className="w-full px-4 py-2 text-white file:bg-pink-500 file:text-white file:rounded-md" />
            <button onClick={handleAddAccount} className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700">
              Agregar Cuenta
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
