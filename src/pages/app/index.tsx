import Image from "next/image";
import { useSession } from "next-auth/react"

import { Calendar } from "../../components/Calendar"
import { Sidebar } from "../../components/Sidebar";
import { ModalAddEvent } from "../../components/ModalAddEvent";
import { Notification } from "../../components/Notification";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { ImageProfile } from "../../components/ImageProfile";

function App() {
  const session = useAuth();
  const { isAuthenticated, loading } = useContext(AuthContext)


  if (!session && !isAuthenticated && !loading) {
    return <Loading />
  }

  return (
    <div className="">
      <div className="w-full py-4 px-6 bg-black flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Meet.ly</h2>
        <div className="flex items-center">
          <ImageProfile 
            colorAvatar={session.colorAvatar} 
            image={session.image}
            avatar_name={session.avatarName}
          />
          <div className="flex justify-center flex-col">
            <span className="text-sm font-semibold text-white mx-2">
              Olá, bem vindo(a)
            </span>
            <span className="text-md font-bold text-white mx-2">
              {session?.name}
            </span>
          </div>
          <Notification />
        </div>
      </div>

      <div className="flex">
        <Sidebar />
        <div className="flex flex-1 mt-6 space-x-6 divide-x divide-gray-200">
          <Calendar />
        </div>
        <ModalAddEvent />
      </div>
    </div>
  )
}

export default App
