import { FC } from "react";
import InterlocutorItem from "../interlocutorItem/InterlocutorItem";
import { IUser } from "../../../entities/User";
import "./InterlocutorLists.scss";

interface InterlocutorsListProps {
  interlocutors: IUser[] | null;
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
    </ul>
  )
}

export default InterlocutorsList;