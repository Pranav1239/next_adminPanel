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
                                <AvatarImage src={session?.user?.image!}  />
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
                                <Link href={"/dashboard"} className="text-blue-600">
                                    Dashboard
                                </Link>
                                <button onClick={() => signOut()} className="text-red-600">
                                    Sign Out
                                </button>
                            </div>
                        </>) : (<>
                            <button onClick={() => signIn()} className="text-green-600 ml-auto">
                                Sign In
                            </button>
                        </>)
                    }

                </PopoverContent>
            </Popover>
        </div>
    )
}

export default User