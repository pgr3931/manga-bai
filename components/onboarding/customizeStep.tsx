import { Button, Group, Stack, Text } from '@mantine/core';
import { useOnboarding } from '../../lib/hooks/provider/onboardingProvider';
import { ColorPicker } from '../header/colorPicker';
import ThemeToggle from '../header/themeToggle';
import LayoutToggle from '../home/toolbar/layoutToggle';

const CustomizeStep = () => {
  const { done } = useOnboarding();

  return (
    <Stack py="xl" spacing="xl" align="flex-start">
      <Text>
        Customize the site to your liking! You can also do this later via the
        settings in the top right corner.
      </Text>
      <Group mt="md">
        <Text>Site theme</Text>
        <ThemeToggle />
      </Group>
      <Group mt="md" spacing="xl">
        <Text>Site color</Text>
        <ColorPicker />
      </Group>
      <Group mt="md">
        <Text>Preferred layout</Text>
        <LayoutToggle labels />
      </Group>
      <Button mt="md" onClick={done}>
        Done
      </Button>
    </Stack>
  );
};

export default CustomizeStep;
