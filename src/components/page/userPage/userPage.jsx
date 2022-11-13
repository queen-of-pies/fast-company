import React from "react";
import UserCard from "../../ui/userInfo/userCard";
import PropTypes from "prop-types";
import QualitiesCard from "../../ui/userInfo/qualitiesCard";
import MeetingsCard from "../../ui/userInfo/meetingsCard";
import CommentsList from "../../ui/comments/commentsList";
import NewComment from "../../ui/comments/newComment";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

    if (!user) {
        return <h1>Loading</h1>;
    }
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard qualities={user.qualities} />
                    <MeetingsCard meetingsCount={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <NewComment userId={userId} />
                    <CommentsList userId={userId} />
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = { userId: PropTypes.string.isRequired };

export default UserPage;
