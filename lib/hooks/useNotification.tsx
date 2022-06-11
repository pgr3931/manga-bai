import { Anchor, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { IoCheckmark, IoClose } from 'react-icons/io5';

const useNotification = () => {
  const { showNotification } = useNotifications();

  const showSuccess = (title?: string, message?: string) =>
    showNotification({
      title,
      message: message ?? '',
      icon: <IoCheckmark size={22} />,
      color: 'teal'
    });

  const showError = (error?: any, message?: string) => {
    console.log(error);
    showNotification({
      title: 'An Error Occurred (ᗒᗣᗕ)՞',
      message: (
        <Text>
          {message ?? (
            <>
              Try to reload the page. If that doesn&apos;t work contact me on{' '}
              <Anchor
                href="https://anilist.co/user/Alzariel/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                AniList
              </Anchor>
            </>
          )}
        </Text>
      ),
      icon: <IoClose size={22} />,
      color: 'red',
      autoClose: false
    });
  };

  return { showSuccess, showError };
};

export default useNotification;
