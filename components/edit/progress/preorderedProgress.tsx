import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC } from 'react';
import { useEntry } from '../../../lib/hooks/provider/entryProvider';
import useNotification from '../../../lib/hooks/useNotification';
import Progress from './progress';

let timeout: NodeJS.Timeout;

const PreorderedProgress: FC<{ buttonVisible: boolean }> = props => {
  const { aniListData, firebaseData, updateFirebaseData } = useEntry();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);
  const { showSuccess } = useNotification();

  const updateProgress = async (progress: number) => {
    if (progress !== firebaseData?.preordered) {
      clearTimeout(timeout);
      await updateFirebaseData({ preordered: progress });
      timeout = setTimeout(
        () =>
          showSuccess(`${aniListData.media.title.userPreferred} entry updated`),
        500
      );
    }
  };

  return (
    <Progress
      text={`Preordered${matches ? ' up to' : ''}`}
      progress={firebaseData?.preordered ?? aniListData.progressVolumes}
      updateProgress={updateProgress}
      {...props}
    />
  );
};

export default PreorderedProgress;
