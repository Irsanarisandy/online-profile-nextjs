This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and includes [TinaCMS](https://tina.io) integration to visually live edit the structured content of the website. ✨

## Features

- [Tina Headless CMS](https://tina.io) for authentication, content modeling, visual editing and team management.
- [Vercel](https://vercel.com) deployment to visually edit the site from the `/admin` route.
- [Cloudinary](https://cloudinary.com) to manage the media.
- Local development workflow from the filesystem with a local GraqhQL server.
- [Storybook](https://storybook.js.org) to document custom components. To initialise in project run `npx sb init --builder webpack5`, which will also make sure to use webpack 5 as the default builder.
- [Cypress](https://www.cypress.io) to do unit, integration and e2e testing. It has been integrated with [Cucumber](https://cucumber.io) to implement BDD automation testing.

## Getting Started

```bash
# run project locally
npm run dev

# build project
npm run build

# lint scripts (JS/JSX/TS/TSX)
npm run lint
# lint and fix scripts (JS/JSX/TS/TSX)
npm run lint-fix

# lint styles (CSS/SCSS)
npm run stylelint
# lint and fix styles (CSS/SCSS)
npm run stylelint-fix

# run storybook locally
npm run storybook

# build storybook
npm run build-storybook

# run cypress tests
npm run cypress

# run cypress tests (without browser)
npm run cypress:headless
```

Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) with the browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Local URLs

- [http://localhost:3000](http://localhost:3000) : browse the website
- [http://localhost:3000/admin](http://localhost:3000/admin) : connect to Tina Cloud and go in edit mode
- [http://localhost:3000/admin/logout](http://localhost:3000/admin/logout) : log out of Tina Cloud
- [http://localhost:4001/altair](http://localhost:4001/altair) : GraphQL playground to test queries and browse the API documentation
- [http://localhost:6006](http://localhost:6006) : browse storybook

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy the Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
