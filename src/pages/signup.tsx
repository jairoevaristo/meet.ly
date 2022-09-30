import { ChangeEvent, useCallback, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import Link from "next/link";
import { SignIn } from "phosphor-react";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import Lottie from "lottie-react";

import MeetAnimation from "../assets/animations/meet.json";
import { useFetch } from "../hooks/useFetch";
import { createUserAPI } from "../services/create.user.api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ICreateUserDTO } from "../dtos/CreateUserDTO";

function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [user, setUser] = useState<ICreateUserDTO>({} as ICreateUserDTO)

  const { data, refetch, loading } = useFetch(() => createUserAPI(user));

  const handleClickShowOrHiddenPassword = useCallback(() => {
    setIsShowPassword(prevState => !prevState);
  }, [])

  const handleSubmit = useCallback(async () => {
    refetch(user)
    console.log(user);
    
  }, [refetch, user]);

  const onChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }, [user]);

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

        <div className="flex flex-col rounded-lg w-96 py-4 px-6 mt-4 2xl:mt-2">
          <h1 className="text-white text-5xl font-bold mb-8">Criar minha conta.</h1>

          <form className="flex items-center justify-center flex-col w-full gap-y-4 2xl:gap-y-7">
            <div className="relative z-0 w-full group">
              <input 
                type="text" 
                autoComplete={null}
                name="name"
                onChange={onChangeText} 
                id="name" 
                className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" 
                placeholder=" " 
                required 
              />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Digite seu nome</label>

              <div className="absolute right-1 top-3">
                <UserIcon className="text-gray-300 w-5 h-5" />
              </div>
            </div>

            <div className="relative z-0 w-full group">
              <input type="text" name="last_name" onChange={onChangeText} id="last_name" className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" placeholder=" " required />
              <label htmlFor="last_name" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Digite seu sobrenome</label>

              <div className="absolute right-1 top-3">
                <UserIcon className="text-gray-300 w-5 h-5" />
              </div>
            </div>

            <div className="relative z-0 w-full group">
              <input type="email" name="email" id="email" onChange={onChangeText} className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Digite seu e-mail</label>

              <div className="absolute right-1 top-3">
                <MailIcon className="text-gray-300 w-5 h-5" />
              </div>
            </div>
            
            <div className="relative z-0 w-full group">
            <input type={isShowPassword ? 'text' : 'password'} name="password" onChange={onChangeText} id="password" className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" placeholder=" " required />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Digite sua senha</label>

              <div 
                className="absolute right-1 top-3 cursor-pointer"
                onClick={handleClickShowOrHiddenPassword}
              >
                {
                  isShowPassword 
                  ? <EyeIcon className="text-gray-300 w-5 h-5" />
                  : <EyeOffIcon className="text-gray-300 w-5 h-5" />
                }
              </div>
            </div>

            <div className="relative z-0 w-full group">
            <input type={isShowPassword ? 'text' : 'password'} name="confirmed_password" onChange={onChangeText} id="confirmed_password" className="block py-2.5 px-0 w-full text-gray-300 bg-transparent border-0 border-b border-gray-600 appearance-none focus:border-gray-300 focus:outline-none focus:ring-0 peer" placeholder=" " required />
              <label htmlFor="confirmed_password" className="peer-focus:font-medium absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-white">Confirmar senha</label>

              <div 
                className="absolute right-1 top-3 cursor-pointer"
                onClick={handleClickShowOrHiddenPassword}
              >
                {
                  isShowPassword 
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
                      Criar conta
                    </>
                  )
              }
            </button>
            
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-gray-400 text-md text-left w-full font-regular flex items-center hover:text-white transition-colors">
                <ArrowLeftIcon className="text-white w-4 h-4 mr-2" />
                  <Link href="/">
                    Voltar para o login
                  </Link>
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

export default SignUp
