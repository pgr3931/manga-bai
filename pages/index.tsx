import { Center, MediaQuery, Stack } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { initializeApollo } from '../apollo/client';
import popularMangaQuery, {
  Media,
  PopularMangaQueryData
} from '../apollo/queries/popularManga';
import Layout from '../components/common/layout';
import Features from '../components/landingPage/features';
import Heading from '../components/landingPage/heading';
import { useUser } from '../lib/hooks/provider/userProvider';

const LoginButton = dynamic(() => import('../components/common/loginButton'), {
  ssr: false
});

const LandingPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  manga
}) => {
  const { fullyAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (fullyAuthenticated === true) {
      router.push('/home');
    }
  }, [fullyAuthenticated]);

  return (
    <Layout>
      <Stack
        sx={theme => ({
          minHeight: `calc(100vh - var(--mantine-header-height, 0px) - ${
            theme.spacing.md * 2
          }px)`
        })}
        py="xs"
        justify="space-between"
      >
        <Heading manga={manga} />
        <Features />
        <Center styles={{ width: '100%' }}>
          <MediaQuery smallerThan="sm" styles={{ width: '100%' }}>
            <div>
              <LoginButton size="md" fullWidth />
            </div>
          </MediaQuery>
        </Center>
      </Stack>
    </Layout>
  );
};

export default LandingPage;

export const getStaticProps: GetStaticProps<{
  manga: {
    id: number;
    title: string;
    src: string;
    transform: string;
    zIndex: number;
  }[];
}> = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<PopularMangaQueryData>({
      query: popularMangaQuery
    });

    const manga: { media: Media; transform: string; zIndex: number }[] = [];
    for (let i = 0; i < data.Page.media.length; i++) {
      const m = data.Page.media[i];
      const even = i % 2 === 0;
      const index = Math.ceil(i / 2);
      const zIndex = index && -index;
      const translate = index * -100;

      if (even) {
        manga.push({
          media: m,
          transform: `translateZ(${translate}px)`,
          zIndex
        });
      } else {
        manga.unshift({
          media: m,
          transform: `translateZ(${translate}px)`,
          zIndex
        });
      }
    }

    return {
      props: {
        manga: manga.map(m => ({
          id: m.media.id,
          title: m.media.title.romaji,
          src: m.media.coverImage.extraLarge,
          transform: m.transform,
          zIndex: m.zIndex
        }))
      },
      revalidate: 60 * 60 * 24
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return {
      props: {
        manga: []
      },
      revalidate: 60 * 60 * 24
    };
  }
};
