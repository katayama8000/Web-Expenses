import { Group, Image, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  file: string | undefined;
  setFile: Dispatch<SetStateAction<string | undefined>>;
};

export const DropZone: FC<Props> = ({ file, setFile }) => {
  const theme = useMantineTheme();

  return (
    <Dropzone
      onDrop={(files) => {
        console.log("accepted files", files);
        setFile(URL.createObjectURL(files[0]));
      }}
      onReject={(files) => {
        console.log("rejected files", files);
        const CODE = files[0].errors[0].code;
        if (CODE === "file-too-large") {
          alert("File is too large");
        } else if (CODE === "file-too-small") {
          alert("File is too small");
        } else if (CODE === "file-invalid-type") {
          alert("file-invalid-type");
        } else if (CODE === "too-many-files") {
          alert("Too many files");
        } else {
          alert("Unknown error");
        }
      }}
      accept={IMAGE_MIME_TYPE}
      // {...props}
      maxFiles={1}
      maxSize={3 * 1024 ** 2}
      padding={-2}
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
        {file !== undefined ? (
          <Image radius="md" src={file} alt="uploaded image" withPlaceholder />
        ) : (
          <div>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </div>
        )}
      </Group>
    </Dropzone>
  );
};

export default DropZone;
