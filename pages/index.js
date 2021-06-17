import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { sanityClient, urlFor } from '../lib/sanity';

const recipesQuery = `*[_type == "recipe"]{_id, name,slug,mainImage}`

export default function Home({ recipes }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Cameron's Kitchen 🍿</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Cameron's Kitchen 🍿</h1>
      <ul className="recipes-list">
        {recipes?.length > 0 && recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-card">
            <Link href={`/recipes/${recipe.slug.current}`}>
              <a>
                <img src={urlFor(recipe.mainImage)} />
                <span>{recipe.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery)
  return { props: { recipes } };
}
