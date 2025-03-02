
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';
export default function Layout_Login(){
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-r from-gray-800 to-indigo-900 ">
      <Header />
      <main className="flex">
        {/* <Sidebar /> */}
        <div className='ml-0 w-full'>
        <Outlet />

        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
