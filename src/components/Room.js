import React from "react";
import { List } from "antd";

import { CheckOutlined } from "@ant-design/icons";

const Room = ({ connectedUsers, showVotes, roomNumber }) => {
  const names = connectedUsers.map((x) => x.user);

  return (
    <List
      size='large'
      style={{ width: "100%" }}
      header='Room Members'
      bordered
      dataSource={names}
      renderItem={(item) => (
        <List.Item>
          {item.Name}
          {item.Vote && (
            <span className='right'>
              {showVotes ? (
                item.Vote
              ) : (
                <CheckOutlined style={{ color: "#00b2b2" }} />
              )}
            </span>
          )}
        </List.Item>
      )}
    />
  );
};

export { Room };
