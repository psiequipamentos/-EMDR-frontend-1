import React from "react";
import { sendIcon } from "../../pages/home/mocks/icons";

export default class InviteBtn extends React.Component {
  render() {
    return (
      <button className="py-4 hover:bg-blue-50 pl-3 pr-4 rounded">
        {sendIcon}
      </button>
    );
  }
}
