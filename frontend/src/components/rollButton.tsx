import { Dices } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export const RollButton = () => {
    const Navigate = useNavigate();
    function Roll() {
        Navigate('/roll_dice');
    }
    return (
        <div onClick={Roll} className='w-60 h-60 border-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 cursor-pointer'>
            <Dices className="w-30 h-30" />
        </div>
    )
}