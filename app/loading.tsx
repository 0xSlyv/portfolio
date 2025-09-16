import { Ripples } from 'ldrs/react'
import 'ldrs/react/Ripples.css'

const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Ripples
                size="105"
                speed="2"
                color="white"
            />
        </div>
    )
}

export default Loading

