export default function Button({children, onClick}){

    return(
        <button
        onClick={onClick}
        className="bg-rose-300 hover:bg-black text-2xl w-full text-white font-bold py-1 px-4 rounded-full mb-1" >
            {children}</button>
    )
    }
    