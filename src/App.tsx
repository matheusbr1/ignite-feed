import styles from './App.module.css'
import { Header } from './components/Header'
import { Post, PostType } from './components/Post'
import { Sidebar } from './components/Sidebar'
import { ErrorBoundary } from "react-error-boundary";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarURL: 'https://github.com/matheusbr1.png',
      name: 'Matheus Baron',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content:  'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-02-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarURL: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO Rocketseat',
    },
    content: [
      { type: 'paragraph', content:  'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-03-03 20:00:00')
  }
]

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div>
        <Header />

        <div className={styles.wrapper} >
          <Sidebar />
          
          <main>
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
              />
            ))}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
