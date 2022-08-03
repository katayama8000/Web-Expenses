import React from "react";
import { DashboardLayout } from "src/layout";
import { Table } from "@mantine/core";
import { PageContainer } from "src/component/PageContainer";
import { PageContent } from "src/component/PageContent";

const MemberEdit = () => {
  const elements = [
    {
      position: "一般",
      number: 1000100072,
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
    {
      position: "一般",
      number: 1000100072,
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
    {
      position: "一般",
      number: 1000100072,
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
    {
      position: "一般",
      number: 1000100072,
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
    {
      position: "一般",
      number: 1000100072,
      name: "片山達文",
      email: "t-katayama@gmail.com",
    },
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.position}</td>
      <td>{element.number}</td>
      <td>{element.email}</td>
    </tr>
  ));
  return (
    <div>
      <PageContainer title="memberedit">
        <PageContent className="w-[800px] m-auto">
          <Table
            horizontalSpacing="xl"
            verticalSpacing="lg"
            fontSize="md"
            highlightOnHover
            className="text-center"
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
