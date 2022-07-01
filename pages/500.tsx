import { Anchor, Button, Stack, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/common/layout';

const ServerError: NextPage = () => {
  const [kaomoji, setKaomoji] = useState<string>();

  useEffect(() => {
    setKaomoji(
      [
        '~(>_<~)',
        '(×_×)',
        '٩(× ×)۶',
        '(ﾒ﹏ﾒ)',
        '[ ± _ ± ]',
        '(￣ω￣;)',
        'ლ(ಠ_ಠ ლ)',
        '(＠_＠)',
        '(⊙_⊙)',
        "┐('～`;)┌"
      ][Math.floor(Math.random() * 10)]
    );
  }, []);

  return (
    <Layout is404>
      <Stack
        align="center"
        justify="center"
        sx={theme => ({
          marginTop: -theme.spacing.md,
          height:
            'calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))'
        })}
      >
        <Title>500 - Server Error {kaomoji}</Title>
        <Text>
          If the error persists contact me on{' '}
          <Anchor
            href="https://anilist.co/user/Alzariel/"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            AniList
          </Anchor>
          . Thanks!
        </Text>
        <Link href="/home" passHref>
          <Button component="a">Let&apos;s get you back home</Button>
        </Link>
      </Stack>
    </Layout>
  );
};

export default ServerError;
