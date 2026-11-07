import { useSyncExternalStore } from "react";
import { swarmController, type SwarmState } from "../../swarm/SwarmController";

/** Subscribe a component to the Swarm experience lifecycle. */
export function useSwarmState(): SwarmState {
  return useSyncExternalStore(
    swarmController.subscribe,
    swarmController.getState,
    swarmController.getState
  );
}
