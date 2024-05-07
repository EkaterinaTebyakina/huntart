import { FC } from "react";

import Avatar from "../avatar/Avatar";
import "./InterlocutorItem.scss";
import { IUser } from "../../../entities/User";


const InterlocutorItem:FC<IUser> = ({id, username, avatar}) => {

  return (
    <div className="interlocutor__item">
      <Avatar img={avatar}/>
      <a className="interlocutor__username" href={`/users/${id}`}>{username}</a>
    </div>
  )
}

export default InterlocutorItem;