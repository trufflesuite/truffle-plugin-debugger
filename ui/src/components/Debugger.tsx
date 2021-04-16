import React, { useEffect, useState } from 'react';

import axios from "axios";
import styled from "styled-components";

import H3 from "../styles/H3";
import PrimaryButton from "../styles/PrimaryButton";
import Sources from "./Sources";
import Variables from "./Variables";
import Tray from "./Tray";
import StatusIcon from "./StatusIcon";
import StatusMessage from "./StatusMessage";
import Tabs from "./Tabs";
import DebugTooltip from "./DebugTooltip";
import KeyboardShortcuts from "./KeyboardShortcuts";
import List from "../styles/List";
import * as Colors from "../styles/colors";
import Loading from "../styles/Loading";

import TruffleDebugger from "@truffle/debugger";
import * as Codec from "@truffle/codec";
import { getTransactionSourcesBeforeStarting } from "@truffle/debug-utils";
import Provider from "@truffle/provider";

import {
  useParams
} from "react-router-dom";

const DebuggerWrapper = styled(List)`
  height: 90vh;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  grid-template-columns: 1fr;
  padding: 1rem 2rem;
`;

const Header = styled(H3)`
  margin: 0 0 2.5rem;
  grid-row: 1;
`;

const ButtonsWrapper = styled.div`
  grid-row: 2;
`;

const TopRowWrapper = styled.div`
  grid-row: 3;
  display: grid;
  grid-template-columns: minmax(36rem, 3.5fr) 1.5fr;
  grid-column-gap: 1.25rem;
`;

const SourceRowWrapper = styled.div`
  overflow-y: overlay;
  grid-row: 4;
  display: grid;
  grid-template-columns: minmax(36rem, 3.5fr) 1.5fr;
  grid-column-gap: 1.25rem;
`;

const TabsWrapper = styled.div`
  * {
    align-self: flex-end;
  }
`;

const VariablesTitle = styled(H3)`
  align-self: flex-end;
`;

const BreakpointsTitle = styled(H3)`
  margin-bottom: 1rem;
`;

const TxHash = styled.span`
  font-weight: lighter;
`;

const DebugButton = styled(PrimaryButton)`
  width: 4rem;
  margin: 0 0.5rem 1rem 0;
`;

const DebugButtonOver = styled(DebugButton)`
  .fa-sync-alt {
    max-height: 0.5rem;
    overflow: hidden;
    position: relative;
    top: -0.25rem;
    left: 0.2rem;
  }

  .fa-circle {
    position: relative;
    top: 0.05rem;
    left: -0.48rem;
    font-size: 0.35rem;
  }
`;

const SourceWrapper = styled.div`
  grid-column: 1;
  display: grid;
  overflow-x: auto;
  overflow-y: auto;
  background: ${Colors.CHOCOLATE_200};
  border-radius: 1rem;
`;

const RightColumnWrapper = styled.div`
  grid-column: 2;
  display: grid;
  grid-template-rows: minmax(30%, 60%) 3rem auto;
`;

const LoadingWrapper = styled(Loading)`
  min-height: 18rem;
`;

const Debugger = ({}) => {
  const [session, setSession] = useState<null | any>(null);
  const [variables, setVariables] = useState<null | any>(null);
  const [returnValue, setReturnValue] = useState<any | any>(null);
  const [sources, setSources] = useState<any | any>(null);
  const [breakpoints, setBreakpoints] = useState<any[]>([]);
  const [status, setStatus] = useState<null | boolean>(null);
  const [selectedLine, setSelectedLine] = useState<number>(0);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [runningTabIndex, setRunningTabIndex] = useState<number>(0);

  let { txHash, port } = useParams();

  const providerUrl = `http://127.0.0.1:${port}`;
  const transaction: any = {
    hash: txHash
  };

  const provider = Provider.create({
    url: providerUrl,
  });

  const start = async () => {
    setVariables(null);
    setSession(null);
    setReturnValue(null);
    setBreakpoints([]);

    const res:any = await axios.get("http://127.0.0.1:54321/artifacts")
    const artifacts: any = res.data;

    const input: {
      compilations: Codec.Compilations.Compilation[];
    } = {
      compilations: [],
    };

    input.compilations = Codec.Compilations.Utils.shimArtifacts(
      artifacts
    );

    const bugger = await TruffleDebugger.forTx(transaction.hash, {
      provider,
      ...input
    });

    const initializedSession = bugger.connect();
    await initializedSession.ready();

    const sourcesInvolvedInTransaction = await getTransactionSourcesBeforeStarting(
      bugger
    );

    const sourceIndicesInvolvedInTransaction = sourcesInvolvedInTransaction.map(
      (source:any) => {
        return parseInt(source.id, 10)
      }
    );

    const sources = input.compilations[0].sources.filter((_: any, index: any) => {
      return sourceIndicesInvolvedInTransaction.includes(index)
    })

    setSources(
      sources
    );

    setSession(initializedSession);
    setVariables(await initializedSession.variables());
    setReturnValue(await initializedSession.returnValue());
    setStatus(await initializedSession.state.evm.transaction.status);

    const currentSource = await initializedSession.view(
      TruffleDebugger.selectors.solidity.current.source
    );
    setRunningTabIndex(currentSource.ast.id);
    setActiveTabIndex(currentSource.ast.id);

    const init = initializedSession.view(
      TruffleDebugger.selectors.solidity.current.sourceRange
    );

    setActiveLine(init.lines.start.line);
    setSelectedLine(init.lines.start.line);
  };

  const executeAction = async (debugAction: string) => {

    if (session) {
      switch (debugAction) {
        case "continueUntil": {
          await session.removeAllBreakpoints();
          breakpoints.forEach(
            async breakpoint => await session.addBreakpoint(breakpoint)
          );
          await session.continueUntilBreakpoint();
          break;
        }
        case "over":
          await session.stepOver();
          break;
        case "into":
          await session.stepInto();
          break;
        case "out":
          await session.stepOut();
          break;
        default:
          break;
      }

      setVariables(await session.variables());
      setReturnValue(await session.returnValue());

      const source = await session.view(
        TruffleDebugger.selectors.solidity.current.source
      );
      setRunningTabIndex(source.ast.id);
      setActiveTabIndex(source.ast.id);

      const sourceRange = await session.view(
        TruffleDebugger.selectors.solidity.current.sourceRange
      );
      setActiveLine(sourceRange.lines.start.line);
      setSelectedLine(sourceRange.lines.start.line);
    }
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <DebuggerWrapper>
      <KeyboardShortcuts executeAction={executeAction} start={start} />
      <Header>
        <StatusIcon status={status} />
        {` `}
        <TxHash>
          TX{` `}
          {transaction.hash || `...`}
        </TxHash>
        <StatusMessage returnValue={returnValue} />
      </Header>
      <ButtonsWrapper>
        <DebugTooltip title={`Continue (F8 or c)`}>
          <DebugButton
            disabled={!variables}
            onClick={() => executeAction("continueUntil")}
          >
            <i className="fas fa-play" />
          </DebugButton>
        </DebugTooltip>
        <DebugTooltip title={`Step Over (F10 or o)`}>
          <DebugButtonOver
            onClick={() => executeAction("over")}
            disabled={!variables}
          >
            <i className="fa fa-sync-alt" />
            <i className="fa fa-circle" />
          </DebugButtonOver>
        </DebugTooltip>
        <DebugTooltip title={`Step Into (F11 or i)`}>
          <DebugButton
            onClick={() => executeAction("into")}
            disabled={!variables}
          >
            <i className="fas fa-arrow-to-bottom" />
          </DebugButton>
        </DebugTooltip>
        <DebugTooltip title={`Step Out (Shift+F10 or u)`}>
          <DebugButton
            onClick={() => executeAction("out")}
            disabled={!variables}
          >
            <i className="fas fa-arrow-to-top" />
          </DebugButton>
        </DebugTooltip>
        <DebugTooltip title={`Restart (r)`}>
          <DebugButton onClick={start}>
            <i className="fas fa-redo-alt" />
          </DebugButton>
        </DebugTooltip>
      </ButtonsWrapper>
      {variables ? (
        <>
          <TopRowWrapper>
            <TabsWrapper>
              <Tabs
                sources={sources}
                setActiveTabIndex={setActiveTabIndex}
                activeTabIndex={activeTabIndex}
                runningTabIndex={runningTabIndex}
              />
            </TabsWrapper>
            <VariablesTitle>Variables</VariablesTitle>
          </TopRowWrapper>
          <SourceRowWrapper>
            <SourceWrapper>
              <Sources
                sources={sources}
                activeTabIndex={activeTabIndex}
                activeLine={activeLine}
                selectedLine={selectedLine}
                breakpoints={breakpoints}
                setBreakpoints={setBreakpoints}
                runningTabIndex={runningTabIndex}
              />
            </SourceWrapper>
            <RightColumnWrapper>
              <Variables variables={variables} />
              <BreakpointsTitle>Breakpoints</BreakpointsTitle>
              <Tray
                breakpoints={breakpoints}
                setBreakpoints={setBreakpoints}
                setActiveTabIndex={setActiveTabIndex}
                setSelectedLine={setSelectedLine}
              />
            </RightColumnWrapper>
          </SourceRowWrapper>
        </>
      ) : (
        <LoadingWrapper />
      )}
    </DebuggerWrapper>
  );
};

export default Debugger;
