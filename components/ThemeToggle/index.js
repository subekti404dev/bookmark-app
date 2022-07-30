import { IconButton, useColorModeValue } from "@chakra-ui/react";
import useColorMode from "../../hooks/useColorModeValue";
import Moon from "../Icons/moon";
import Sun from "../Icons/sun";

export default function ThemeToggle(props) {
  const { toggleColorMode, newColorMode } = useColorMode();
  const Icon = useColorModeValue(
    <Moon h={5} color="gray.600" />,
    <Sun h={5} color="white" />
  );

  return (
    <IconButton
      data-testid="theme-toggle"
      variant="ghost"
      aria-label={`Toggle ${newColorMode} mode`}
      title={`Activated ${newColorMode} mode`}
      icon={Icon}
      bgColor="transparent"
      onClick={toggleColorMode}
      {...props}
    />
  );
}
