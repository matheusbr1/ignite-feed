import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
  content: string
  onDelete: (content: string) => void
}

export function Comment (props: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment () {
    props.onDelete(props.content)
  }

  function handleLikeCount () {
    setLikeCount(likeCount => likeCount + 1)
  }

  return (
    <div className={styles.comment} >
      <Avatar hasBorder={false} src="https://github.com/matheusbr1.png" />

      <div className={styles.commentBox} >
        <div className={styles.commentContent} >
          <header>
            <div className={styles.authorAndTime} >
              <strong>Matheus Baron</strong>
              <time 
                title="11 de Maio às 08:13h" 
                dateTime="2022-05-11 08:13:30" 
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button title='Deletar' onClick={handleDeleteComment} >
              <Trash size={24} />
            </button>
          </header>

          <p>{props.content}</p>
        </div>

        <footer>
          <button onClick={handleLikeCount} >
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}