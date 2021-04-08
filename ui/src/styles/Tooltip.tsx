import React from "react";
import TooltipBase, { RCTooltip } from "rc-tooltip";
import { createGlobalStyle } from "styled-components";

// Access rc-tooltip's global classes to adjust tooltip styles
const TooltipStyleFix = createGlobalStyle`
  .rc-tooltip-inner {
    min-height: 0;
  }
`;

// interface IProps extends RCTooltip.Props {
//   children: React.ReactNode;
// }

const Tooltip = ({ children, ...rest }: any) => (
  <>
    <TooltipStyleFix />
    <TooltipBase {...rest}>{children}</TooltipBase>
  </>
);

export default Tooltip;
