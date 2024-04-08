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
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </>)
                    }

                </PopoverTrigger>
                <PopoverContent className='max-w-[150px]'>
                    {
                        session ? (<>
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <div className="bg-blue-600 rounded-md text-white p-2 ">
                                    <Link href={"/dashboard"} >
                                        Dashboard
                                    </Link>
                                </div>
                                <div className="bg-red-600 rounded-md text-white p-2 ">
                                    <button onClick={() => signOut()} className="">
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </>) : (<>
                            <div className="bg-blue-600 rounded-md text-white p-2 ">
                                <button onClick={() => signIn()}>
                                    Sign In
                                </button>
                            </div>
                        </>)
                    }

                </PopoverContent>
            </Popover>
        </div>
    )
}

export default User