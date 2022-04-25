import { NextPage } from "next";
import { H3, H4 } from "../components/styled/header";
import { useEffect } from 'react';
import { getPosts } from "../utils/frontEndApi";
import { HStack } from '../components/styled/stack';
import { PrimaryButton } from '../components/styled/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from '../utils/helpers/iconMap';
import { useRouter } from 'next/router'
const query = `
{
    posts(first:30){
      edges{
        node{
          createdAt
          description
          id
          name
          votesCount
        }
      }
    }
  }
`
const Task1: NextPage = () => {
    useEffect(()=>{
        getPosts(query)
            .then(response=>{
                console.log(response.data)
            })
            .catch(err=>{console.warn(err)})
    },[])
    const router = useRouter()
    return ( 
        <div >
            <H3>Part I: Extract content from Product Hunt and serve as an API</H3>
            <p>You can choose either Option A or B for the API completion. You can limit the number of extracted items to 30.</p>
            <hr className="my-6"></hr>
            <div>
                <H4>Option A: Use Product Hunt GraphQL API as a Data Provider</H4>
                <ul className="list-disc">
                    <li>
                    Build a function to query Product Hunt GraphQL API during runtime when querying from the client
                    </li>
                    <li>
                    Product Hunt API: <span><a>https://api.producthunt.com/v2/docs</a></span>
                    </li>
                </ul>
            </div>
            <hr className="my-6"></hr>
            <HStack className="justify-end">
                <p> open devtools to see</p>
                <PrimaryButton onClick = {()=>{
                    router.reload()
                }}>
                    <FontAwesomeIcon
                        className="w-4 h-4"
                        icon={iconMap('rotate-right')}
                    />
                </PrimaryButton>
            </HStack>
        </div>
      
    )
}
export default Task1