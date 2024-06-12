import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button className="bg-black text-white text-3xl px-4 py-2 px-4 rounded-full" onClick={() => signOut()} >Sign out</button>
      </>
    )
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button onClick={() => signIn()} className="bg-black text-white text-3xl px-4 py-2  font-serif rounded-full hover:bg-white hover:text-black" >Sign in</button>
    </>
  )
}