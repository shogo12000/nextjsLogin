import Link from "next/link";


const Nav = ({children}) =>{
    return (
        <>
            <Link href="/" > Register </Link>
            <Link href="/login" > Login</Link>
            <Link href="/dashboard/user"> User</Link>
  
            {children}
        </>
    )
}

export default Nav;