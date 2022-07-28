import { Group, Image, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { DashboardLayout } from "src/layout";
import { useState } from "react";

export const DropZone = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme();
  const [file, setFile] = useState<string>();

  return (
    <Dropzone
      onDrop={(files) => {
        console.log("accepted files", files);
        setFile(URL.createObjectURL(files[0]));
      }}
      onReject={(files) => console.log("rejected files", files)}
      accept={IMAGE_MIME_TYPE}
      {...props}
      padding={-2}
      maxFiles={1}
      maxSize={3 * 1024 ** 2}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        {/* <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div> */}
        <div>
          <Image radius="md" src={file} alt="Random unsplash image" />
        </div>
      </Group>
    </Dropzone>
  );
};

export default DropZone;
