import { FC } from "react";
import InterlocutorItem from "../interlocutorItem/InterlocutorItem";
import "./InterlocutorLists.scss";

export interface IUser {
  id?:number
  username?:string
}

interface InterlocutorsListProps {
  interlocutors?: IUser[];
}

const InterlocutorsList:FC<InterlocutorsListProps> = ({interlocutors}) => {

  const renderItems = () => {
    return interlocutors?.map(user => (
      <li key={user?.id} className="interlocutor">
        <InterlocutorItem id={user?.id} username={user?.username} avatar={user?.avatar}/>
      </li>
    ))
  }

  return (
    <ul className="interlocutors-list">
      {
        interlocutors?.length > 0 ? renderItems() : 
        <div style={{margin: "50px auto", textAlign: "center"}}>Список пуст</div>
      }
      {/* {renderItems()} */}
    </ul>
  )
}

export default InterlocutorsList;