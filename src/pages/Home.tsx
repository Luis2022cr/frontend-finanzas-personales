export default function Home() {
    return (
        <>
            <div className="h-screen bg-gradient-to-r from-gray-800 to-indigo-900">
                
                <header className="border-b-2">
                    <div className='flex justify-between items-center mx-5 p-2'>
                        <a href="/" className='text-white font-bold'>
                            Control de finanzas
                        </a>
                        <a href="/login" className="bg-indigo-950 hover:bg-indigo-800 text-sky-50 py-1 px-4 rounded-xl"> Login</a>
                    </div>
                </header>

                <div className="my-52 md:my-52">
                    <h1 className="md:text-5xl text-center font-bold justify-center text-indigo-600">
                        Bienvenidos al Control de finanzas personales
                    </h1>
                    <h2 className="text-center text-indigo-300">version 1.0</h2>
                </div>
            
            </div>
        </>
    );
}
