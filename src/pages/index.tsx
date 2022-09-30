import { ChangeEvent, useCallback, useContext, useState } from "react";
import { getSession, signIn } from "next-auth/react"
import { GithubLogo, SignIn } from "phosphor-react";
import { GetServerSideProps } from "next";
import { EyeIcon, EyeOffIcon, UserIcon } from "@heroicons/react/outline";
import Lottie from "lottie-react";
import Link from "next/link";

import MeetAnimation from "../assets/animations/meet.json";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ILoginUserDTO } from "../dtos/LoginUserDTO";
import { AuthContext } from "../contexts/authContext";

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [user, setUser] = useState<ILoginUserDTO>({} as ILoginUserDTO)

  const { handleLogin, loading } = useContext(AuthContext)

  const handleSubmit = useCallback(async () => {
    handleLogin(user)
  }, [user, handleLogin]);

  const onChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }, [user]);

  const handleClickShowOrHiddenPassword = useCallback(() => {
    setIsShowPassword(prevState => !prevState);
  }, []);

  return (
    <div className="2xl:pt-16 w-full h-screen bg-black">
      <div className="flex items-center max-w-6xl mx-auto px-4">
        <div className="flex flex-col justify-center items-start flex-1">
          <div className="flex items-center justify-start 2xl:w-[30vw] w-[40vw]">
            <Lottie 
              animationData={MeetAnimation} 
              loop={true} 
            />
          </div>
          
          <h1 className="2xl:text-5xl text-3xl text-white leading-tight font-semibold max-w-lg">
            Organize suas agenda de maneira simples e fácil 📅.
          </h1>
        </div>

        <div className="flex flex-col rounded-lg w-96 py-4 px-6 mt-12 2xl:mt-2">
          <h1 className="text-white text-5xl font-bold">Olá,</h1>
          <h1 className="text-white text-5xl font-bold mb-8">Bem vindo(a)</h1>

          <form className="flex items-center justify-center flex-col w-full gap-y-5 2xl:gap-y-6">
          <div className="relative z-0 w-full group">
            <input 
              type="email" 
              name="email" 
              id="email" 
              onChange={onChangeText}
              className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" 
              placeholder=" " 
              required 
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Digite seu e-mail</label>

            <div className="absolute right-1 top-3">
              <UserIcon className="text-gray-300 w-5 h-5" />
            </div>
          </div>
            
            <div className="z-0 w-full group relative">
              <input 
                type={isShowPassword ? 'text' : 'password'} 
                name="password" 
                id="password" 
                onChange={onChangeText}
                className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" 
                placeholder=" " 
                required
              />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Digite sua senha</label>
              <div 
                className="absolute right-1 top-3 cursor-pointer"
                onClick={handleClickShowOrHiddenPassword}
              >
                {
                  !isShowPassword 
                  ? <EyeIcon className="text-gray-300 w-5 h-5" />
                  : <EyeOffIcon className="text-gray-300 w-5 h-5" />
                }
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="border-zinc-700 hover:bg-zinc-900 hover:border-zinc-900 w-full py-3 text-white rounded-sm border flex items-center justify-center text-md"
            >
              {
                loading
                  ? <LoadingSpinner size="small" />
                  : (
                    <>
                      <SignIn className="text-white w-7 h-7 mr-2" />
                      Entrar
                    </>
                  )
              }
              
            </button>
            
            <div className="flex w-full items-center gap-x-3">
              <div className="w-full border border-zinc-800" />
                <span className="text-white ">ou</span>
              <div className="w-full border border-zinc-800" />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <button
                type="button"
                onClick={() => signIn('github')}
                className="border-zinc-700 hover:bg-zinc-900 hover:border-zinc-900 w-full py-3 text-white rounded-sm border flex items-center justify-center text-md"
              >
              <GithubLogo className="text-white w-7 h-7 mr-2" />
              Entrar com o Github
            </button>
              <span className="text-gray-300 mt-6 text-md text-left w-full font-regular">
                Não tem uma conta ainda? 
                <span className="ml-1 font-bold pr-1 hover:border-gray-300 hover:border-b w-full h-12 text-gray-30 transition duration-200">
                  <Link href="/signup">
                      Criar conta agora
                  </Link>
                </span>.
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Login
