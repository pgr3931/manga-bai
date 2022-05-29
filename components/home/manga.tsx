import { useMutation } from '@apollo/client';
import {
  Anchor,
  Box,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import updateMangaEntry, {
  UpdateMangaEntryData,
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import { MediaList, Status } from '../../apollo/queries/mediaQuery';
import useNotification from '../../lib/hooks/useNotification';
import EditModal from '../edit/modal';
import Progress from '../edit/progress';

export interface UpdatedValues {
  status?: Status;
  progressVolumes?: number;
  progress?: number;
}

const Manga: React.FC<MediaList> = props => {
  const { coverImage, title } = props.media;
  const { hovered, ref } = useHover();
  const { showSuccess, showError } = useNotification();

  const [data, setData] = useState(props);
  const { status, progressVolumes, mediaId, media } = data;

  const [updateEntry, { error }] = useMutation<
    UpdateMangaEntryData,
    UpdateMangaEntryVariables
  >(updateMangaEntry);

  useEffect(() => {
    if (error) showError();
  }, [error]);

  const updateData = async (values: UpdatedValues) => {
    Object.keys(values).forEach(key => {
      if (values[key as keyof typeof values] === undefined)
        delete values[key as keyof typeof values];
    });

    if (!Object.keys(values).length) return;

    const { data } = await updateEntry({
      variables: { ...values, mediaId }
    });

    if (!data) return;

    setData(prev => ({ ...prev, ...data.SaveMediaListEntry }));
    showSuccess(`${media.title.userPreferred} Entry Updated`);
  };

  const updateProgress = (progress: number, key: keyof MediaList) => {
    if (progress === data[key]) return;
    updateData({ [key]: progress });
  };

  const newVolumeAvailable = Math.random() > 0.7;

  return (
    <Paper radius="sm">
      <Group noWrap align="flex-start" spacing="sm">
        <Box style={{ position: 'relative' }}>
          <Image
            radius="sm"
            style={{ objectFit: 'scale-down' }}
            height={180}
            width="auto"
            src={coverImage.large}
            alt={title.userPreferred}
            withPlaceholder
          />
          {newVolumeAvailable && (
            <div className="new-volumes-available">
              <Text size="sm" sx={theme => ({ color: theme.colors.gray[0] })}>
                New Volume Available
              </Text>
            </div>
          )}
        </Box>
        <Stack
          ref={ref}
          py="xs"
          pr="xs"
          align="stretch"
          justify="space-between"
          style={{ flexGrow: 1, minHeight: 180 }}
        >
          <Stack>
            <Text lineClamp={2} style={{ wordBreak: 'break-word' }}>
              <Title order={6} title={title.userPreferred}>
                {title.userPreferred}
              </Title>
            </Text>
            <Stack spacing={3}>
              <Progress
                text="Volume Progress:"
                progressKey="progressVolumes"
                progress={progressVolumes}
                buttonVisible={hovered}
                updateProgress={updateProgress}
              />
              <Progress
                text="Preordered Up To:"
                progressKey="progressVolumes"
                progress={progressVolumes}
                buttonVisible={hovered}
                updateProgress={updateProgress}
              />
            </Stack>
          </Stack>
          <Group position="apart" align="center">
            <EditModal
              {...props}
              status={status}
              progressVolumes={progressVolumes}
              updateData={updateData}
            />
            <Stack spacing={2} align="flex-end">
              <Anchor
                size="sm"
                href="https://amzn.to/3lEKHwX"
                target="_blank"
                referrerPolicy="no-referrer"
                style={{ lineHeight: 1 }}
              >
                Buy on Amazon
              </Anchor>
              <Text size="xs" color="dimmed" style={{ lineHeight: 1 }}>
                (Affiliate Link)
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default Manga;
