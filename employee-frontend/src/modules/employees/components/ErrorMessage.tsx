import React from "react";

interface IProps {
  message: any;
}

const ErrorMessage: React.FC<IProps> = (props) => {
  return (
    <div>
      <div className="container mt-2">
        <div className="row">
          <div className="col text-center">
            <div className="h2 text-danger">{props.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
