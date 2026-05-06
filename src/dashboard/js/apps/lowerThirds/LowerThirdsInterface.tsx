import { useReplicant } from "@nodecg/react-hooks";
import { BUNDLE_NAME } from "../../../../utils/utils";
import { useCallback, useMemo } from "react";
import { useFallbackReplicant } from "../../../../utils/hooks";
import { Button } from "../../components/Button";
import { styled } from "styled-components";

const LOWER_THIRD_REQUEST_COOLDOWN_MS = 200;

interface LowerThirdsInterfaceProps<T> {
  type: string;
  replicantName: string;
  defaultValue: () => T;
  children: React.ReactNode;
}

export function LowerThirdsInterface<T>({
  type,
  replicantName,
  defaultValue,
  children
}: LowerThirdsInterfaceProps<T>): React.ReactNode {
  const [replicant, setReplicant] = useReplicant(replicantName, {
    defaultValue: defaultValue(),
    bundle: BUNDLE_NAME,
  });
    
  const [isLowerThirdAnimating] = useReplicant('lowerThirds:isAnimating', {
    defaultValue: false,
    bundle: BUNDLE_NAME,
  });

  const [lowerThirdLastRequested] = useFallbackReplicant('lowerThirds:lastRequested', {
    defaultValue: Date.now(),
    bundle: BUNDLE_NAME,
  });

  const [lowerThirdDuration] = useFallbackReplicant('lowerThirds:displayDurationMs', {
    defaultValue: 0,
    bundle: BUNDLE_NAME,
  });

  const handleReset = useCallback(() => {
    setReplicant(defaultValue());
  }, [setReplicant]);


  const handleShowLowerThird = useCallback(() => {
    if (!replicant) return;

    nodecg.sendMessage('lowerThirds:request', {
      type,
      data: replicant
    });
  }, [replicant, type]);

  const handleShowLowerThirdIndefinite = useCallback(() => {
    if (!replicant) return;

    nodecg.sendMessage('lowerThirds:request', {
      type,
      data: replicant,
      indefinite: true,
    });
  }, [replicant, type]);

  const handleHideLowerThirds = useCallback(() => {
    nodecg.sendMessage('lowerThirds:hideVisible');
  }, []);

  const isLowerThirdOnCooldown = Date.now() - lowerThirdLastRequested <= LOWER_THIRD_REQUEST_COOLDOWN_MS;
  const isLowerThirdTriggerable = !isLowerThirdAnimating && !isLowerThirdOnCooldown;

  return (
    <>
      <BigActions>
        <Button onClick={handleShowLowerThird} disabled={!isLowerThirdTriggerable}>
          Show Nameplates ({Math.floor(lowerThirdDuration / 1000)}s)
        </Button>
        <Button onClick={handleShowLowerThirdIndefinite} disabled={!isLowerThirdTriggerable}>
          Show Nameplates (indefinite)
        </Button>
      </BigActions>
      {children}
      <SetActions>
        <Button onClick={handleReset}>Reset All</Button>

        <Button onClick={handleHideLowerThirds}>
          Hide Visible Lower Third
        </Button>
      </SetActions>
    </>
  );
}


const SetActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
`;

const BigActions = styled(SetActions)`
  border-top: none;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  & button {
    font-size: 1.5rem;
  }
`;