// src/components/Loading.tsx
import React from 'react';
// import loadingImage from '../assets/loading.svg'; // Asegúrate de ajustar la ruta según donde esté tu imagen
import loadingImage from '../assets/logoArtifys.png'; // Asegúrate de ajustar la ruta según donde esté tu imagen

const Loading_Artifys: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen  relative">
        <img 
          src={loadingImage} 
          alt="Cargando..." 
          className="absolute inset-0 mx-auto my-auto h-16 w-16" 
        />
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
    </div>
  );
};

export default Loading_Artifys;
