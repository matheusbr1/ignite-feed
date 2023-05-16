import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react'

interface Author {
  name: string
  role: string
  avatarURL: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  publishedAt: Date
  content:Content[]
}

interface PostProps {
  post: PostType
}

export function Post ({ post }: PostProps) {
  const [comments, setComments] = useState([
    'Post legal meu camarada!'
  ])

  const [commentInput, setCommentInput] = useState('')

  const publishedDateFormated = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'" , {
    locale: ptBR
  })
  
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault()

    setComments(comments => [...comments, commentInput])

    setCommentInput('')
  }

  function handleNewCommentInvalid (e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Esse campo é obrigatório.')
  }

  function handleCommentInputChange (e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('')
    setCommentInput(e.target.value)
  }

  function deleteComment (comment: string) {
    setComments(comments => comments.filter(c => c !== comment))
  }

  return (
   <article className={styles.post} >
    <header>
      <div className={styles.author} >
        <Avatar src={post.author.avatarURL} />
        
        <div className={styles.authorInfo} >
          <strong>{post.author.name}</strong>
          <span>{post.author.role}</span>
        </div>
      </div>

      <time 
        title={publishedDateFormated} 
        dateTime={post.publishedAt.toISOString()}
      >
        {publishedDateRelativeToNow}
      </time>
    </header>

    <div className={styles.content} >
      {post.content.map(item => {
        if (item.type === 'paragraph') {
          return <p key={item.content} >{item.content}</p>
        } 
        if (item.type === 'link') {
          return (
            <p key={item.content} >
              <a href="#" >{item.content}</a>
            </p>
          )
        } 
      })}
    </div>

    <form onSubmit={handleCreateNewComment} className={styles.commentForm} >
      <strong>Deixe seu feedback</strong>

      <textarea 
        placeholder='Deixe um comentário'
        name='comment'
        value={commentInput}
        required
        onChange={handleCommentInputChange}
        onInvalid={handleNewCommentInvalid}
      />

      <footer>
        <button type='submit' disabled={!commentInput} >Publicar</button>
      </footer>
    </form>

    <div className={styles.commmentList} >
      {comments.map(comment => (
        <Comment
          key={comment}
          content={comment}
          onDelete={deleteComment}
        />
      ))}
    </div>
   </article>
  )
}