import { useLogout } from "../../hooks/useLogout"
export default function StudentHeader() {
    const { logout } = useLogout()

    const onLogout = async () => {
        logout()
      }
    return (
        <>
        <nav className="flex justify-between py-4 px-10 lg:px-16 shadow-lg rounded" >
        <div className="text-3xl font-bold text-purple-600">SIP Portal</div>
        <button
          className="bg-yellow-500 text-black py-2 px-6 rounded-2xl hover:bg-yellow-600"
          onClick={(e) => onLogout()}>Log Out</button>

      </nav>
        </>
    )
}