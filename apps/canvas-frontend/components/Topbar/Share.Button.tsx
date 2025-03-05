

interface ShareButtonProps{
    onClick: ()=> void
}

function ShareButton({onClick}: ShareButtonProps) {
  return (
    <div className="absolute top-5 right-3 bg-blue-600 text-white text-sm font-medium rounded">
        <button onClick={onClick} className="px-2.5 py-0.5 ">
            Share 
        </button>   
    </div>
  )
}

export default ShareButton
