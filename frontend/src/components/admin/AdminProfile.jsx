import AdminHeader from "./AdminHeader";
import AdminNavbar from "./AdminNavbar";
import AdminProfileCard from "./AdminProfileCard";
import UpdateProfile from "./UpdateProfile";

export default function AdminProfile() {
    return (
        <>
            <AdminHeader />

            <section className=" flex flex-col md:flex-row lg:flex-row py-1 bg-blueGray-50">
                <AdminNavbar />

                <div className="mx-10 my-4 border rounded border-spacing-4 border-zinc-600 flex flex-col w-full lg:flex-row">
                    <div className="w-3/5"><AdminProfileCard/></div>
                    <div className="border-l my-4 border-stone-500"></div>
                    <div className="w-2/5"><UpdateProfile /></div>
                </div>

            </section>

        </>
    )
}