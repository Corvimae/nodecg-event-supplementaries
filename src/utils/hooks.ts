import { useReplicant } from '@nodecg/react-hooks';
import { useEffect, useRef } from 'react';
import { Jsonify } from 'type-fest';

export type UseDefaultableReplicantOptions<T> = {
	defaultValue: T
	bundle?: string;
	persistent?: boolean;
};

/**
 * useReplicant, but if the value is undefined then the default value is returned instead.
 */
export function useFallbackReplicant<V, T = Jsonify<V>>(
	replicantName: string,
	opts: UseDefaultableReplicantOptions<T>,
): [T, (newValue: T | ((oldValue?: T | undefined) => void)) => void] {
	const [value, setValue] = useReplicant(replicantName, opts);

	return [value === undefined ? opts.defaultValue : value, setValue];
}

export function useOnMount(callback: React.EffectCallback) {
  const savedCallback = useRef<React.EffectCallback | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const onDismount = savedCallback.current?.();

    return () => {
      if (onDismount) onDismount();
    };
  }, []);
}

