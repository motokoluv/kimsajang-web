import {NextPage} from "next";
import {useRouter} from "next/router";
import {getCsrfToken, signIn, useSession} from "next-auth/react";
import {SubmitHandler, useForm} from "react-hook-form";
import Link from "next/link";
import {CtxOrReq} from "next-auth/client/_utils";

interface ISignInInputs {
    email: string;
    password: string;
}

interface IProps {
    csrfToken?: string
}

const Index: NextPage = ({csrfToken} : IProps) => {
    const router = useRouter();
    const {data: session} = useSession()

    const {register, handleSubmit, watch, formState: {errors}} = useForm<ISignInInputs>();

    const onSubmit: SubmitHandler<ISignInInputs> = async ({email, password}) => {
        const result = await signIn("credentials",
            {
                redirect: false,
                email,
                password
            }
        );

        //console.log(result);
        if (result?.error) {
            //console.log(`Error occured : ${result.error}`)
        } else {
            await router.replace("/");
        }
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-900">
                <div className="flex justify-center h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/3"
                         style={{backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"}}>
                        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                            <div>
                                <h2 className="text-4xl font-bold text-white">Kimsajang</h2>

                                <p className="max-w-xl mt-3 text-gray-300">김사장 신사장 박사장</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Kimsajang</h2>

                                <p className="mt-3 text-gray-500 dark:text-gray-300">자영업자 커뮤니티</p>
                            </div>

                            <div className="mt-8">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email
                                            Address</label>
                                        <input
                                            {...register("email", {required: true})}
                                            type="email" name="email" id="email" placeholder="example@example.com"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password"
                                                   className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                            <a href="#"
                                               className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                                                password?</a>
                                        </div>

                                        <input
                                            {...register("password", {required: true})}
                                            type="password" name="password" id="password" placeholder="Your Password"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            로그인
                                        </button>
                                    </div>

                                </form>

                                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet?
                                    <span className="text-blue-500 focus:outline-none focus:underline hover:underline">
                                        <Link href={"/auth/signUp"}>
                                            Sign up
                                        </Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Index;

export async function getServerSideProps(context: CtxOrReq | undefined) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}