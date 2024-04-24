// import React, { useState, useEffect } from 'react'
// import Dexie from 'dexie'

import { Box } from '@mui/material'

// interface Post {
//   // title: string
//   // content: string
//   file: string
// }

// const Main: React.FC = () => {
//   // set the database
//   const db = new Dexie('ReactDexie')

//   // create the database store
//   db.version(1).stores({
//     posts: 'file',
//     // posts: 'title, content, file',
//   })

//   db.open().catch((err) => {
//     console.log(err.stack || err)
//   })

//   // set the state and property
//   const [postFile, setFile] = useState<string>('')
//   const [posts, setPosts] = useState<Post[]>([])

//   // read the file and decode it
//   const getFile = (e: FileList) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(e[0])
//     reader.onload = () => {
//       setFile(reader.result as string)
//     }
//   }

//   // submit
//   const getPostInfo = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (postFile !== '') {
//       const post: Post = {
//         file: postFile,
//       }

//       db.posts.add(post).then(async () => {
//         // retrieve all posts inside the database
//         let allPosts = await db.posts.toArray()
//         // set the posts
//         setPosts(allPosts)
//       })
//     }
//   }

//   useEffect(() => {
//     // get all posts from the database
//     const getPosts = async () => {
//       let allPosts = await db.posts.toArray()
//       setPosts(allPosts)
//     }
//     getPosts()
//   }, [])

//   let postData: JSX.Element

//   if (posts.length > 0) {
//     postData = (
//       <div className="postsContainer">
//         {posts.map((post) => {
//           console.log(post.file, 'ankit image is here')
//           return (
//             <div
//               style={{
//                 backgroundImage: 'url(' + post.file + ')',
//                 width: '300px',
//                 height: '300px',
//                 backgroundSize: 'cover',
//               }}
//             />
//           )
//         })}
//       </div>
//     )
//   } else {
//     postData = (
//       <div className="message">
//         <p>There are no posts to show</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       <form onSubmit={getPostInfo}>
//         <div className="control">
//           <label htmlFor="cover" className="cover">
//             Choose a file
//           </label>
//           <input
//             type="file"
//             id="cover"
//             name="file"
//             onChange={(e) => getFile(e.target.files as FileList)}
//           />
//         </div>

//         <input type="submit" value="Submit" />
//       </form>

//       {postData}
//     </>
//   )
// }

// export default Main

const UploadFile = ({
  selectedValue,
  title,
  onChange,
}: {
  selectedValue: string
  title: string
  onChange: (value: string) => void
}) => {
  const getFile = (e: FileList) => {
    const reader = new FileReader()
    reader.readAsDataURL(e[0])
    reader.onload = () => {
      console.log(reader.result)
      if (reader.result == null) return
      onChange(reader.result as string)
    }
  }

  const postData = (
    <div>
      <img
        src={selectedValue}
        width={'200px'}
        height={'200px'}
        style={{ border: 'solid', borderWidth: '1px', padding: '10px' }}
      />
    </div>
  )

  return (
    <Box sx={{ width: '300px' }}>
      {postData}
      <div
        className="control"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="cover" className="cover">
          {title}
        </label>
        <input
          type="file"
          id="cover"
          name="file"
          onChange={(e) => getFile(e.target.files as FileList)}
        />
      </div>
    </Box>
  )
}

export default UploadFile
