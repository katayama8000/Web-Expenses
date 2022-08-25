import { Group, Image, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Dispatch, FC, memo, SetStateAction } from "react";

type Props = {
  receipt: File | undefined;
  setReceipt: Dispatch<SetStateAction<File | undefined>>;
};

export const DropZone: FC<Props> = memo(({ receipt, setReceipt }) => {
  console.log("DropZone");
  const theme = useMantineTheme();

  return (
    <Dropzone
      onDrop={(files) => {
        setReceipt(files[0]);
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
        {receipt !== undefined ? (
          <Image
            radius="md"
            src={URL.createObjectURL(receipt!)}
            alt="uploaded image"
            withPlaceholder
          />
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
});

DropZone.displayName = "DropZone";
