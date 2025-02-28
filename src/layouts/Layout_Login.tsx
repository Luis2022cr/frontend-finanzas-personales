
import { Outlet } from 'react-router-dom';
export default function Layout_Login(){
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* <Header_login /> */}
      <main className="flex">
        {/* <Sidebar /> */}
        <div className='ml-0 md:ml-40 w-full'>
        <Outlet />

        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
