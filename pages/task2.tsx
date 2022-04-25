import { NextPage } from "next"
import { Fragment } from "react";
import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { H3, H4, H6 } from '../components/styled/header';
import { HStack, VStack } from '../components/styled/stack';
import { PrimaryButton } from '../components/styled/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from '../utils/helpers/iconMap';
import { useElementSize } from "usehooks-ts";
import { getPosts } from '../utils/frontEndApi';
import { Listbox, Transition } from "@headlessui/react";
import { GridLoader } from "react-spinners";

const formQueries = (size:0|1|2, featured:boolean):string=>{
    const sizeArr = [20,30,40]
    return `
{
    posts(first:${sizeArr[size]} ${featured?', featured:true, order:FEATURED_AT':', featured:false, order:NEWEST'}){
      edges{
        node{
          description
          name
          votesCount
        }
      }
    }
  }
`
}
interface IRequestState{
    requestSuccess: boolean
    requestFail: boolean
    data:any
    error:any
    loading: boolean
}
interface IAction{
    type:"fetch"|"fetchSuccess"|"fetchFail"
    payload?:any
}
interface IFeatureOption{
    name:string
    value:boolean
}
const defaultObject: IRequestState={
    requestSuccess:false,
    requestFail:false,
    data:null,
    error:null,
    loading:false,
}

const Task2: NextPage = () => {
    
    const reducer = (state:IRequestState,action:IAction)=>{
        switch(action.type){
            case 'fetch':
                return {...state, loading:true, requestSuccess:false,requestFail:false}
            case 'fetchSuccess':
                return {...state, loading:false,requestSuccess:true, requestFail:false, data:action.payload}
            case 'fetchFail':
                return {...state, loading:false,requestSuccess:false,requestFail:true, data:action.payload}
            default:
                return state
        }
    }
    const [fetchState, dispatch] = useReducer( reducer ,defaultObject)
    const featureOptions:Array<IFeatureOption> = [
        {name: 'Featured', value: true},
        {name: 'Newest', value: false},
    ]
    const [featured, setFeatured] = useState(featureOptions[0])
    const [ref, { width }] = useElementSize()
    
    const fetchData = useCallback((x:0|1|2)=>{
        dispatch({type:'fetch'})
        let query = formQueries(x, featured.value)
        getPosts(query).then(response=>{
            dispatch({type:'fetchSuccess', payload:response.data})
        }).catch(err=>{
            dispatch({type:'fetchFail', payload:err})
        })
    },[featured.value])
    
    const queryIndex = useRef<0|1|2>((width<768?0:(width>1280?2:1))); // reduce rerender

    useEffect(()=>{ // reload on screen resize
        if(queryIndex.current != (width<768?0:(width>1280?2:1))){
            queryIndex.current=(width<768?0:(width>1280?2:1))
            fetchData(queryIndex.current)
        }
    },[width,fetchData])
    useEffect(()=>{ // reload feature update
        fetchData(queryIndex.current)
    },[fetchData])
    

    const renderItems = ()=>{
        if(fetchState.requestFail){
            return(<H3 className = 'uppercase'>fail</H3>)
        }else if(fetchState.requestSuccess){
            if(fetchState?.data?.posts?.edges?.length>0){
                return( <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 bg-slate-100" >
                    {fetchState.data.posts.edges.map((e:any,i:number)=>{
                        return (
                            <HStack key={i} className="justify-around p-6 rounded shadow-sm shadow-md animate-fade-in-down bg-slate-50 hover:bg-white">
                                <VStack className='justify-between w-2/3 h-full text-justify'>
                                    <div className="self-start font-bold">{e.node.name}</div>
                                    <div>{e.node.description}</div>
                                </VStack>
                                <div className="self-start p-4 border-2 rounded border-slate-700">{e.node.votesCount}</div>
                            </HStack>
                        )
                    })}
                </div>)
            }else{
                return(<H3 classname = 'uppercase'>not found </H3>)
            }
        }else{
            return(
                <GridLoader size={15} margin={2} color='#06b6d4'></GridLoader>
            )
        }
    } 
    return (
        <div ref={ref}>
            <H3>Part II: Query content from the API and display elegantly</H3>
            <div>
                <ul className="list-disc">
                    <li>
                    Implement the UI layer with React
                    </li>
                    <li>
                    Display the data either as a grid view using Tailwind CSS
                    </li>
                    <li>
                    Support Responsive Design, allowing more items to be displayed with a wider screen
                    </li>
                    <li>
                    Add a single selection filter, allowing user to display products base on their selection of the product’s category
                    </li>
                    <li>
                    Tailwind CSS:<span><a href='https://tailwindcss.com/'> https://tailwindcss.com/ </a></span>
                    </li>
                </ul>
            </div>
            <hr className="my-6"></hr>
            <H6 className='uppercase'>Filters</H6>
            <HStack className="items-center justify-start col-span-1 gap-4 p-6 mb-4 rounded shadow-xl md:col-span-3 xl:col-span-4 bg-slate-100"> 
                <Listbox value={featured} onChange={setFeatured}>
                    <div className="relative w-40 mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{featured.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <FontAwesomeIcon
                                    icon={iconMap('chevron-down')}
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        {/* <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        > */}
                        <Listbox.Options className={'absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'}>
                            {featureOptions.map((feature, index) => (
                                /* Use the `active` state to conditionally style the active option. */
                                /* Use the `selected` state to conditionally style the selected option. */
                                <Listbox.Option 
                                    key={index} 
                                    className={({ active }) =>
                                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                            active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                        }`
                                    }
                                    value={feature}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {feature.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <FontAwesomeIcon icon={iconMap('check')} className="w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                        {/* </Transition> */}
                    </div>
                </Listbox>
            </HStack>
            <H6 className='uppercase'>post display</H6>
            <HStack className="p-6 rounded shadow-xl bg-slate-100" >
                {renderItems()}
            </HStack>
        </div>
    )
}
export default Task2