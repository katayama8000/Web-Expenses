import React, { useState } from "react";
import { DashboardLayout } from "src/layout";
import { Button, Group, Modal, Table, Tooltip } from "@mantine/core";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "src/component/PageContent";
import { Trash, Edit } from "tabler-icons-react";

type Member = {
  name: string;
  position: "役員" | "一般" | "リーダー";
  email: string;
};

const MemberEdit = () => {
  const [isOpend, setIsOpend] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [user, setUser] = useState<Member>();
  const elements: Member[] = [
    {
      position: "一般",
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
    {
      position: "一般",
      name: "片山帆乃果",
      email: "t-katayama@gmail.com",
    },
    {
      position: "リーダー",
      name: "片山兄",
      email: "t-katayama@gmail.com",
    },
    {
      position: "役員",
      name: "片山弟",
      email: "t-katayama@gmail.com",
    },
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.position}</td>
      <td>{element.email}</td>
      <td>
        <div className="flex">
          <Trash
            size={22}
            strokeWidth={2}
            color={"black"}
            className="mx-[6px] hover:opacity-50"
            onClick={() => {
              setDeleteModal(true);
              setUser(element);
            }}
          />
          <Edit
            size={22}
            strokeWidth={2}
            color={"black"}
            className="mx-[6px] hover:opacity-50"
            onClick={() => {
              handleEdit(element);
            }}
          />
        </div>
      </td>
    </tr>
  ));

  const handleEdit = (member: Member) => {
    setIsOpend(true);
    setUser(member);
    console.log(member);
  };
  return (
    <div>
      <Modal
        opened={isOpend}
        onClose={() => setIsOpend(false)}
        title="従業員編集"
        centered
      >
        {user?.name}
        {user?.position}
        {user?.email}
      </Modal>

      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title={
          <div className="text-center font-bold text-xl">
            <div>従業員削除</div>
          </div>
        }
        centered
      >
        <div className="text-center my-6">
          {user?.name}さんを削除します。 <br />
          よろしいですか？
        </div>
        <Group position={"center"}>
          <Button color={"red"}>はい</Button>
          <Button color={"teal"}>いいえ</Button>
        </Group>
      </Modal>

      <PageContainer title="従業員一覧">
        <PageContent className="w-[800px] m-auto">
          <Table
            horizontalSpacing="xl"
            verticalSpacing="lg"
            fontSize="md"
            //highlightOnHover
          >
            <thead>
              <tr>
                <th>名前</th>
                <th>役職</th>
                <th>メールアドレス</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </PageContent>
      </PageContainer>
    </div>
  );
};

MemberEdit.getLayout = DashboardLayout;
export default MemberEdit;
