import { useContext } from 'react';

import { RuntimeEnvConfigContext } from '@/context/runtime-env-config-context-provider';

const useRuntimeEnvConfig = () => {
  return useContext(RuntimeEnvConfigContext);
};

export default useRuntimeEnvConfig;
