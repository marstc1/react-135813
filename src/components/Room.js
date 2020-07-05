import React from "react";

const Room = ({ connectedUsers, showVotes }) => {
  return (
    <div>
      <h2>The Room</h2>
      {connectedUsers && (
        <>
          <ul>
            {connectedUsers.map((connectedUser) => (
              <li key={connectedUser.connectionId}>
                {connectedUser.user.Name}
                {connectedUser.user.Vote && (
                  <span>
                    {showVotes ? connectedUser.user.Vote : " - Voted"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export { Room };
