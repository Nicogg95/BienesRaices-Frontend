import { useContext } from "react"
import BlogContext from "../context/BlogProvider"

const useBlog = () => {
  return useContext(BlogContext);
}

export default useBlog;