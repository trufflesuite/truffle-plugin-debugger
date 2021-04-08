import React from "react";
import styled from "styled-components";
import LoadingSmall from "../styles/LoadingSmall";
import IconBase from "../styles/IconBase";
import * as Colors from "../styles/colors";

const TxSuccess = styled(IconBase)`
  color: ${Colors.CI_GREEN};
`;

const TxFail = styled(IconBase)`
  color: ${Colors.CI_RED};
`;

interface IProps {
  status?: any;
}

const StatusIcon = ({ status }: IProps) => {
  return (
    <>
      {status === null ? (
        <LoadingSmall />
      ) : status ? (
        <TxSuccess
          className="fas fa-check-circle"
          title="Transaction Succeeded"
        />
      ) : (
        <TxFail className="fas fa-times-circle" title="Transaction Failed" />
      )}
    </>
  );
};

export default StatusIcon;
