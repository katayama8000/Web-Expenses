import React, { FC, useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "@pages/_layout";
import { Button, Group, Modal, Table, Tooltip } from "@mantine/core";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "src/component/PageContent";
import { Trash, Edit } from "tabler-icons-react";
import { supabase } from "src/lib/supabase/supabase";
import { CustomNextPage } from "next";
import { useGetAllMembers } from "@hooks/useGetAllMembers";
import { Key } from "tabler-icons-react";
import type { MemberModel } from "@type/index";

const MemberEdit: CustomNextPage = () => {
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { AllMembers } = useGetAllMembers();

  const handleEdit = useCallback((member: MemberModel) => {
    setIsEditModal(true);
    console.log(member);
  }, []);

  const handleDelete = useCallback((member: MemberModel) => {
    setIsDeleteModal(true);
    console.log(member);
  }, []);

  const rows = AllMembers?.map((member) => (
    <tr key={member.name}>
      <td>{member.name}</td>
      <td>{member.position}</td>
      <td>{member.email}</td>
      <td>
        {member.isHaveKey && <Key size={22} strokeWidth={2} color={"black"} />}
      </td>

      {/* <td>
        <div className="flex">
          <Trash
            size={22}
            strokeWidth={2}
            color={"black"}
            className="mx-[6px] hover:opacity-50"
            onClick={() => {
              handleDelete(member);
            }}
          />
          <Edit
            size={22}
            strokeWidth={2}
            color={"black"}
            className="mx-[6px] hover:opacity-50"
            onClick={() => {
              handleEdit(member);
            }}
          />
        </div>
      </td> */}
    </tr>
  ));

  return (
    <div>
      {/* <EditModal
        member={members?.[0]!}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
      />
      <DeleteModal
        member={members?.[0]!}
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
      /> */}

      <PageContainer title="従業員一覧">
        <PageContent className="w-[800px] m-auto">
          <Table
            horizontalSpacing="xl"
            verticalSpacing="lg"
            fontSize="md"
            highlightOnHover
          >
            <thead>
              <tr>
                <th>名前</th>
                <th>役職</th>
                <th>メールアドレス</th>
                <th>オフィスキー</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </PageContent>
      </PageContainer>
    </div>
  );
};

type Props = {
  member: MemberModel;
  isEditModal: boolean;
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModal: boolean;
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditModal: FC<Props> = ({ member, isEditModal, setIsEditModal }) => {
  return (
    <div>
      <Modal
        opened={isEditModal}
        onClose={() => setIsEditModal(false)}
        title="従業員編集"
        centered
      >
        <div>{member?.name}</div>
      </Modal>
    </div>
  );
};

const DeleteModal: FC<Props> = ({
  member,
  isDeleteModal,
  setIsDeleteModal,
}) => {
  return (
    <div>
      <Modal
        opened={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="従業員削除"
        centered
      >
        <div>{member?.name}</div>
        <Group position={"center"}>
          <Button
            color={"red"}
            onClick={async () => {
              const { data, error } = await supabase
                .from("member")
                .delete()
                .match({ id: member.id });
            }}
          >
            はい
          </Button>
          <Button color={"teal"}>いいえ</Button>
        </Group>
      </Modal>
    </div>
  );
};

MemberEdit.getLayout = DashboardLayout;
export default MemberEdit;
