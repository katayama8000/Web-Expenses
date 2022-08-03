import React, { useState } from "react";
import { DashboardLayout } from "src/layout";
import { Button, Group, Modal, Table } from "@mantine/core";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "src/component/PageContent";

type Member = {
  name: string;
  number: number;
  position: string;
  email: string;
};

const MemberEdit = () => {
  const [isOpend, setIsOpend] = useState<boolean>(false);
  const [user, setUser] = useState<Member>();
  const elements: Member[] = [
    {
      position: "一般",
      number: 1000100072,
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
    {
      position: "一般",
      number: 10001023,
      name: "片山帆乃果",
      email: "t-katayama@gmail.com",
    },
    {
      position: "リーダー",
      number: 10001035272,
      name: "片山兄",
      email: "t-katayama@gmail.com",
    },
    {
      position: "役員",
      number: 1000102357,
      name: "片山弟",
      email: "t-katayama@gmail.com",
    },
  ];

  const rows = elements.map((element) => (
    <tr
      key={element.name}
      onClick={() => {
        handleEdit(element);
      }}
    >
      <td>{element.name}</td>
      <td>{element.position}</td>
      <td>{element.number}</td>
      <td>{element.email}</td>
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
        {user?.number}
        {user?.email}
      </Modal>

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
                <th>従業員番号</th>
                <th>メールアドレス</th>
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
