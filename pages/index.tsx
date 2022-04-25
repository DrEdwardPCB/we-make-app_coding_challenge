import type { NextPage } from 'next'
import {H1, H2} from '../components/styled/header'
import { PrimaryButton } from '../components/styled/button';

const Home: NextPage = () => {
    return (
        <div className={'w-screen p-6'}>
            
            <H1>
                    WeMakeApp-coding challenge
            </H1>
            <H2>
                    Author: Edward Wong
            </H2>
            <PrimaryButton><a href="https://wemakeapp-docs.notion.site/WeMakeApp-Coding-Challenge-6af51db8a8da414caf5761e530510155">requirement of the project</a></PrimaryButton>
        </div>
    )
}

export default Home
