This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

--- 
# project readme
from this section onward it will be documentation about this project. it will contain steps and necessary setup to kick start the project as well as some file settings

## getting started

### obtaining API token and save in .env.local

1. Obtain via create account on producthunt then and access from API Dashboard on User Icon
2. install ngrok on a testing computer, this may be useful if you want to do OAuth instead of developer token
3. run `ngrok http 3000` to expose localhost
4. register with your appname as well as the ngrok
    - you may edit it anytime and this is just a process to get developer token
5. click on add developer token to get developer token that never expires
6. copy the info and fill the `.env.local` clone from `.env.example`

remarks: the NEXT_PUBLIC_URL is used for front-end to backend api call do change when deploy
### run the dev
to have better consistency in running the programme do ensure it is running in nodev14 as well as use yarn as package manager. 
```
yarn # install packages  
yarn dev # run development server default at port 3000
```
## project structure
- `/pages` contains base page for each route
- `/pages/api` contians api handlers
- `/pages/api/resolvers` contains graphql resolver for cheerio scrapped data
- `/pages/api/schema` contains graphql schema for cheerio scrapped data
- `/pages/api/apollo.ts` contains micro apollo server that serves schema and resolvers for data scrap by cheerio

- `/components` contain reuseable tsx/jsx components
- `/components/Layouts` contains layout that can be added . _app.tsx
- `/components/styled` contains template component made using [tailwind-styped-component](https://www.npmjs.com/package/tailwind-styled-components)
- `/metas` containg project metas right now only navMenu info.js
- `/utils` contains api as well as hooks and helper function that can be use across the project

## api endpoint
- `/api/cheerio` get json scrapped by cheerio
- `/api/apollo` graphql of data scrapped by cheerio
```
type  Post {
        name: String
        description: String
        votesCount: String
    }

    type  Query {
        posts: [Post]
    }`

```
- `/api/graphal` backend caller of producthunt graphql api 
    - the reason is to hide developer token from front_end user

## pages
- `/task1A`: complete part 1 option A requirement(display in dev console trigger by onload)
- `/task1B`: complete part 1 option B requirement(display in dev console trigger byonload)
- `/task2 `: complete task 2 requirement using option A api


## further impovement
### projectwise
- add test case
- use meaningful name in commit
- setup more strict eslint rules
### frontend
- can make code more reuseable e.g. separate listbox to component instead of inline
- can have a better separation for frontend and backend especially in `utils/api*.ts` section
- can implement OAuth login mechanism instead of relying on developer token
    - this requires ngrok to open a SSL encrypted tunnel as a callback url
- can add images and display in individuals post item
### backend
- can use more cheerio functionality on finding and building more detailed json file of the component
- can use library like node-phantom-simple to trigger more data loaded on the page to fetch more data
- open more filters for cheerio graphql
- add API log using library like winston