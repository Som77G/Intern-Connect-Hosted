export default function ShowProjects({ project, number }) {
    return (
        <>
            <div className="mt-8 mx-8 bg-zinc-900 flex flex-col justify-center relative overflow-hidden ">
                <div className="border rounded-lg w-full max-w-7xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 shadow-md shadow-zinc-950"></div>
                        <div className="relative px-7 py-6 bg-zinc-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                            <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
                            </svg>
                            <div className="space-y-2">
                                <p className="font-semibold text-gray-50 text-xl">Project{number} Links </p>
                                <br/>
                                <div className="space-y-4">
                                    <p>GitHub Link: <a className="text-blue-500 hover:underline" href={project.githubLink}  target = "_blank">Click Here</a></p>
                                    <p>Project Link (Hosted) : <a className="text-blue-500 hover:underline" href={project.projectLink}  target = "_blank">Click Here</a></p>
                                    <p>Demo Link: <a className="text-blue-500 hover:underline" href={project.demoLink}  target = "_blank">Click Here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}