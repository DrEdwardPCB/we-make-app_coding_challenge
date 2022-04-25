export interface IPostItemProps{
    name: string, 
    description: string, 
    votesCount: string
}
import { HStack, VStack } from "./styled/stack"
const PostItem = ({name, description, votesCount}:IPostItemProps)=>{
    return (
        <HStack className="justify-around p-6 rounded shadow-sm shadow-md animate-fade-in-down bg-slate-50 hover:bg-white">
            <VStack className='justify-between w-2/3 h-full text-justify'>
                <div className="self-start font-bold">{name}</div>
                <div>{description}</div>
            </VStack>
            <div className="self-start p-4 border-2 rounded border-slate-700">{votesCount}</div>
        </HStack>
    )
}
export default PostItem