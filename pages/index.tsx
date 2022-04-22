import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {H1, H2} from '../components/styled/header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className={'w-screen'}>
            
            <H1>
                    WeMakeApp-coding challenge
            </H1>
            <H2>
                    Edward Wong
            </H2>
            
        </div>
    )
}

export default Home
