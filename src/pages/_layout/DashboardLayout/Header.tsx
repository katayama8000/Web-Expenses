import { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Divider,
  Group,
  Indicator,
  Autocomplete,
  ActionIcon,
} from "@mantine/core";
import { Logout, Bell, Search, Settings } from "tabler-icons-react";
import { getPath } from "src/lib/const";
import { Menu, Button, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons";
import { supabase } from "src/lib/supabase/supabase";

export const Header: FC<{ left: ReactNode }> = ({ left }) => {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.white,
      })}
    >
      <Group spacing="lg" noWrap>
        {left}
        <SearchForm />
        <Notification />
        <UserMenu />
      </Group>
    </Box>
  );
};

const SearchForm: FC = () => {
  return (
    <Autocomplete
      data={[]}
      size="lg"
      placeholder="Search"
      icon={<Search size={18} />}
      styles={{
        root: { flexGrow: 1 },
        input: { border: 0, backgroundColor: "transparent" },
      }}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

const Notification: FC = () => {
  return (
    <Indicator inline size={14} offset={4} color="red" withBorder>
      <Link href={getPath("NOTIFICATION")} passHref>
        <ActionIcon
          component="a"
          //variant="hover"
          radius="xl"
          size={40}
        >
          <Bell />
        </ActionIcon>
      </Link>
    </Indicator>
  );
};

const UserMenu: FC = () => {
  const { push } = useRouter();
  const signOut = () => {
    push(getPath("SIGN_IN"));
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>
          <Link href={getPath("SETTINGS")}>
            <a>Settings</a>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>
          <div className="line-through">Messages</div>
        </Menu.Item>
        <Menu.Item
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error(error);
            } else {
              window.alert("ログアウトしました");
              push("/sign-in");
            }
          }}
          icon={<Logout size={14} strokeWidth={2} color={"black"} />}
        >
          <div>logout</div>
        </Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          <div className="line-through">Search</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
