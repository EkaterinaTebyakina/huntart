import { FC, useEffect, useState, useRef } from "react";
import Chat from "../../../shared/ui/chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchComment, fetchComments, selectComments, selectId } from "../../../app/model/slices/artSlice";
import { NavLink } from "react-router-dom";
import "./CommentsSection.scss";
import { selectIsAuth, selectMyId } from "../../../app/model/slices/authSlice";
import clsx from "clsx";

interface CommentsSectionProps {
  height?: string;
  placeholder?: string;
}

const STANDARD_HEIGHT = "450px"//"506px"
const DEFAULT_PLACEHOLDER = "Введите комментарий..."

const CommentsSection:FC<CommentsSectionProps> = ({height=STANDARD_HEIGHT, placeholder=DEFAULT_PLACEHOLDER}) => {

  const dispatch = useDispatch<ThunkDispatch>();

  const artId = useSelector(selectId);
  const comments = useSelector(selectComments);
  const isAuth = useSelector(selectIsAuth);
  const myId = useSelector(selectMyId);

  // useEffect(() => {
  //   // dispatch(fetchComments(artId));
  // }, [])

  //Scroll behaviour
  const msgsEndRef = useRef(null)

  const scrollToBottom = () => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [comments]);

  //Input behaviour
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (message) {
        dispatch(fetchComment({id: artId, text: message}))
        setMessage('')
      } 
    }
  };

  const renderInput = () => {
    return  <div className="chat__input-block">
              <input type="text" 
                     className="chat__input"
                     value={message}
                     placeholder={placeholder}
                     onChange={handleChange}
                     onKeyDown={handleKeyDown}/>
            </div>
  }

  const renderComments = () => {

      return (
        <ul className="chat__comments-list">
          {
            comments?.map((comment) => {
              const dateStr = comment.created_at;
              const date = new Date(dateStr)
              const yyyy = date.getFullYear();
              let mm = date.getMonth() + 1; // Months start at 0!
              let dd = date.getDate();
              if (dd < 10) dd = '0' + dd;
              if (mm < 10) mm = '0' + mm;
              
              const hour = date.getHours();
              const min = date.getMinutes();
              // const sec = date.getSeconds();

              const formattedDate = `${hour}:${min} ${dd}.${mm}.${yyyy}`;
              // console.log(formattedDate)

              return (
                <li className={clsx("chat__comment", isAuth && (myId === comment?.user?.id) && 'chat__comment--yours')} key={comment.id}>
                  <NavLink className="chat__comm-author" to='/'>{comment?.user?.username}</NavLink>
                  <p className="chat__comm-content">{comment.text}</p>
                  <p className="chat__comm-date">{formattedDate}</p>
                </li>
              )
            })
          }
          <div ref={msgsEndRef}/>
        </ul>
      )
  }

  return (
    <div className="comments">
      {/* <div className="chat" style={{height: height}}>
        {renderInput()}
        {renderComments()}
      </div> */}
      <Chat renderInput={renderInput} renderMsgs={() => renderComments()} height={height} data={comments}/>
    </div>
  )
}

export default CommentsSection;