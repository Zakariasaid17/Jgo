
import {Button} from '../../components/ui/button';

function Buttons(){
     
    return(
        <div className='p-4 space-y-4 flex flex-col'>
         <Button>Click</Button>
         <Button variant='primary'>Click Outline</Button>
         <Button variant='primaryOutline'> Primary Outline</Button>
         <Button variant='secondary'>secondary</Button>
         <Button variant='secondaryOutline'> secondary Outline</Button>
         <Button variant='danger'>danger</Button>
         <Button variant='dangerOutline'> danger Outline</Button>
         <Button variant='super'>super</Button>
         <Button variant='superOutline'> super Outline</Button>
         <Button variant='ghost'>ghost</Button>
         <Button variant='sidebar'>sidebar</Button>
         <Button variant='sidbarOutline'>sidebar Outline</Button>
        </div>
    )
}


export default Buttons