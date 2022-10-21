import React, { useState } from "react";
import api from "../../../api";
import UserCard from "../../ui/userInfo/userCard";
import PropTypes from "prop-types";
import QualitiesCard from "../../ui/userInfo/qualitiesCard";
import MeetingsCard from "../../ui/userInfo/meetingsCard";
import CommentsList from "../../ui/comments/commentsList";
import NewComment from "../../ui/comments/newComment";
import { useUsers } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const [comments, setComments] = useState([]);
    const { getUserById } = useUsers();
    const user = getUserById(userId);

    const fetchComments = () => {
        api.comments.fetchCommentsForUser(userId).then((comments) => {
            comments.sort((a, b) => +b.created_at - +a.created_at);
            setComments(comments);
        });
    };

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
                    <CommentsProvider>
                        <NewComment
                            fetchComments={fetchComments}
                            pageId={userId}
                        />
                        <CommentsList
                            comments={comments}
                            fetchComments={fetchComments}
                        />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = { userId: PropTypes.string.isRequired };

export default UserPage;
