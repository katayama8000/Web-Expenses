import React from "react";
import { DashboardLayout } from "src/layout";

const MemberEdit = () => {
  return (
    <div>
      <div>memberedit</div>
      <div>管理者だけがいじれるメンバー管理ページ</div>
    </div>
  );
};

MemberEdit.getLayout = DashboardLayout;
export default MemberEdit;
