import { showNotification } from "@mantine/notifications";
import { IconCheck, IconDots, IconArrowBackUp } from "@tabler/icons";

export const toast = (
  title: string,
  message: string,
  color: "red" | "teal" = "teal"
): void => {
  showNotification({
    disallowClose: true,
    title: title,
    message: message,
    color: color,
    icon: <IconCheck size={18} />,
  });
};
