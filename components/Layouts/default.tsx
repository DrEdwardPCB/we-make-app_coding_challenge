import NavBar from '../navbar';
export interface IPropsDefaultLayouts {
    children:JSX.Element
}
const DefaultLayouts = ({children}: IPropsDefaultLayouts)=>{
    return (
        <div className='w-screen min-h-screen'>
            <NavBar></NavBar>
            <div className='px-6 py-3'>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayouts