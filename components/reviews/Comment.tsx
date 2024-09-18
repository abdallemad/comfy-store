'use client'
import { useState } from "react"
import { Button } from "../ui/button";
const Comment = ({comment}:{comment:string}) => {
  const [isExpanded,setIsExpanded] = useState(false);
  const toggleExpand = ()=>{
    setIsExpanded(!isExpanded);
  }
  const isLongComment = comment.length >130;
  const displayComment = (isLongComment && !isExpanded)? `${comment.slice(0,130)}...`:comment;
  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {
        isLongComment && <Button variant="link" className="pl-0 text-muted-foreground" onClick={toggleExpand}>
          {isExpanded?'show less':"show more"}
        </Button>
      }
    </div>
  )
}

export default Comment
