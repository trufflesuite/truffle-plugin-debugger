import React from "react";
import { GlobalHotKeys } from "react-hotkeys";

interface IProps {
  executeAction: (debugAction: string) => Promise<void>;
  start: () => Promise<void>;
}

const KeyboardShortcuts = ({ executeAction, start }: IProps) => {
  const keyMap = {
    STEP_OVER: ["o", "f10"],
    STEP_INTO: ["i", "f11"],
    STEP_OUT: ["u", "shift+f11"],
    CONTINUE_UNTIL: ["c", "f8"],
    RESTART: ["r"],
  };

  const over = () => {
    executeAction("over");
  };

  const into = () => {
    executeAction("into");
  };

  const out = () => {
    executeAction("out");
  };

  const continueUntil = () => {
    executeAction("continueUntil");
  };

  const restart = () => {
    start();
  };

  const handlers = {
    STEP_OVER: over,
    STEP_INTO: into,
    STEP_OUT: out,
    CONTINUE_UNTIL: continueUntil,
    RESTART: restart,
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} />
  );
};

export default KeyboardShortcuts;
