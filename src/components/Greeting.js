import '../styles.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdTrackChanges } from 'react-icons/md';
import { MdTrendingUp } from 'react-icons/md';
import { BiSmile } from 'react-icons/bi';

function Greeting(){
    return (
    <div className='greetings'>
        <div className='heading'> 
            <h2> Monthly Task Planner</h2>
            <p> Plan your tasks <FaCalendarAlt size={22} color="orange" />, Track your tasks <MdTrackChanges size={28} color="red"/> and make your life easy...<MdTrendingUp color="green" size={33} /><BiSmile color="yellow" size={27} /></p>            
        </div>
    </div>
    );
}

export default Greeting;