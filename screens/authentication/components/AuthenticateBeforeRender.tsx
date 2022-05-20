import { FunctionComponent } from "react";
import { connect } from "react-redux";
import { AppState } from "../../../redux/store";

const mapStateToProps = (state: AppState) => {
  return {
    username: state.user.username,
    email: state.user.email,
  };
};

interface Props {
  username: string;
  email: string;
}

const AuthenticateBeforeRender: FunctionComponent<Props> = ({
  render,
  username,
  email,
}) => {
  return username ? render() : <Login returnAfterLogin={render()} />;
};

export default connect(mapStateToProps)(AuthenticateBeforeRender);
