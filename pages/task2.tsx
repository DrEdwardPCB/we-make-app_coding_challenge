import { NextPage } from "next"
import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { H3,H4 } from "../components/styled/header"
import { HStack } from '../components/styled/stack';
import { PrimaryButton } from '../components/styled/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from '../utils/helpers/iconMap';
import { useElementSize } from "usehooks-ts";
import { getPosts } from '../utils/frontEndApi';

const formQueries = (size:0|1|2, featured:boolean):string=>{
    const sizeArr = [20,30,40]
    return `
{
    posts(first:${sizeArr[size]} ${featured?', featured:true, order:FEATURED_AT':', featured:false, order:NEWEST'}){
      edges{
        node{
          createdAt
          description
          id
          name
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
                return {...state, loading:true, requestSuccess:true,requestFail:false}
            case 'fetchSuccess':
                return {...state, loading:false,requestSuccess:true, requestFail:false, data:action.payload}
            case 'fetchFail':
                return {...state, loading:false,requestSuccess:false,requestFail:true, data:action.payload}
            default:
                return state
        }
    }
    const [fetchState, dispatch] = useReducer( reducer ,defaultObject)
    const [featured, setFeatured] = useState(true)
    const [ref, { width }] = useElementSize()
    const fetchData =useCallback((x:0|1|2)=>{
        dispatch({type:'fetch'})
        let query = formQueries(x, featured)
        console.log('fetchData', query)
        getPosts(query).then(response=>{
            console.log('response',response)
            dispatch({type:'fetchSuccess', payload:response.data})
        }).catch(err=>{
            console.log('err',err)
            dispatch({type:'fetchFail', payload:err})
        })
    },[featured])
    const queryIndex = useRef<0|1|2>((width<768?0:(width>1280?2:1))); // reduce rerender
    useEffect(()=>{
        if(queryIndex.current != (width<768?0:(width>1280?2:1))){
            queryIndex.current=(width<768?0:(width>1280?2:1))
            fetchData(queryIndex.current)
        }
    },[width, fetchData])

    const renderItems = ()=>{
        if(fetchState.requestFail){
            return(<div>fail</div>)
        }else if(fetchState.requestSuccess){
            if(fetchState?.data?.length>0){
                return(<div>ok</div>)
            }else{
                return(<div>notfound </div>)
            }
        }else{
            return(<div>loading</div>)
        }
    } 
    return (
        <div ref={ref}>
            <H3>Part II: Query content from the API and display elegantly</H3>
            <div>
                <H4>Option A: Use Product Hunt GraphQL API as a Data Provider</H4>
                <ul>
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
            <div> 
                {/* filters */}
            </div>
            <hr></hr>
            <div className="grid col-span-1 md:col-span-3 xl:col-span-4">
                {renderItems()}
            </div>
        </div>
    )
}
export default Task2