import { Grid, Stack } from "@mantine/core";
import React from "react";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "src/component/PageContent";
import { DashboardLayout } from "src/layout";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

const Application = () => {
  const dummy: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <PageContainer title="過去の申請書類">
        <Grid>
          {dummy.map((item) => {
            return (
              <Grid.Col span={4} key={item}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Norway Fjord Adventures</Text>
                    <Badge color="pink" variant="light">
                      On Sale
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    With Fjord Tours you can explore more of the magical fjord
                    landscapes with tours and activities on and around the
                    fjords of Norway
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    Book classic tour now
                  </Button>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </PageContainer>
    </div>
  );
};

Application.getLayout = DashboardLayout;

export default Application;
