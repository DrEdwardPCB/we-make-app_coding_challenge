import { NextPage } from "next";
import { H3, H4 } from "../components/styled/header";
import { useEffect } from 'react';
import { getCheerioPosts } from "../utils/frontEndApi";
import { HStack } from '../components/styled/stack';
import { PrimaryButton } from '../components/styled/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from '../utils/helpers/iconMap';
import { useRouter } from 'next/router'
const query = `
{
    posts{
        description
        name
        }
}
`
const Task1: NextPage = () => {
    useEffect(()=>{
        getCheerioPosts(query)
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
                <H4>Option B: Use Playwright and/or CheerIO as a Web Scraper (Bonus)</H4>
                <ul className="list-disc">
                    <li>
                    Build a function to extract data. The data can be served during runtime when querying from the client or store it locally as a JSON
                    </li>
                    <li>
                    Use GraphQL to serve the extracted content
                    </li>
                    <li>
                    Playwright: https://playwright.dev/
                    </li>
                    <li>
                    CheerIO: https://cheerio.js.org/
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