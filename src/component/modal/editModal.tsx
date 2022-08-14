import React, { FC } from "react";

type Member = {
  name: string;
  position: "役員" | "一般" | "リーダー";
  email: string;
};

type Props = {
  member: Member;
  isEditModal: boolean;
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const editModal: FC<Props> = ({
  member,
  isEditModal,
  setIsEditModal,
}) => {
  return <div>editModal</div>;
};
