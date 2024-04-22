import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


const User = () => {

    const { data: session } = useSession();

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    {
                        session ? (<>
                            <Avatar>
                                <AvatarImage src={session?.user?.image!} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </>) : (<>
                            <Avatar>
                                <AvatarImage src={"https://github.com/shadcn.png"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </>)
                    }

                </PopoverTrigger>
                <PopoverContent className='max-w-[150px]  bg-[#180617]  border-none'>
                    {
                        session ? (<>
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <div className=" py-2 px-4 rounded-md text-white">
                                    <button onClick={() => signOut()} className="">
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </>) : (<>
                            <div className=" rounded-md bg-[#180617] text-white flex flex-col justify-center items-center gap-2 p-2 ">
                                <Link href={"/login"}>
                                    Sign In
                                </Link>
                                <Link href={"/register"}>
                                    Sign Up
                                </Link>
                            </div>
                        </>)
                    }

                </PopoverContent>
            </Popover>
        </div>
    )
}

export default User