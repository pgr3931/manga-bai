import { Avatar, Button, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoChevronDownOutline, IoLogOutOutline } from 'react-icons/io5';
import { useUser } from '../../lib/hooks/userProvider';

const User = () => {
  const { fullyAuthenticated, aniListUser, signOut: singOut } = useUser();
  const [opened, { toggle }] = useDisclosure(false);

  return fullyAuthenticated === true ? (
    <Popover
      opened={opened}
      onClose={toggle}
      target={
        <Button
          variant="subtle"
          p={0}
          mt={3}
          color="gray"
          onClick={toggle}
          rightIcon={<IoChevronDownOutline size={18} />}
        >
          <Avatar src={aniListUser?.avatar.large} />
        </Button>
      }
      styles={{ inner: { padding: 5 } }}
      position="bottom"
      withArrow
    >
      <Button
        variant="subtle"
        color="gray"
        leftIcon={<IoLogOutOutline size={16} />}
        onClick={singOut}
      >
        Logout
      </Button>
    </Popover>
  ) : (
    <Button
      onClick={() =>
        window.open('/signin', 'Login with AniList', 'height=500,width=500')
      }
    >
      Login with AniList
    </Button>
  );
};

export default User;
