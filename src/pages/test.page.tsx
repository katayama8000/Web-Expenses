import { Button } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { Breadcrumbs, Anchor } from "@mantine/core";

const Profile = () => {
  const [image, setImage] = useState<File | undefined>();
  const [website, setWebsite] = useState("");
  const [path, setPath] = useState("");

  const handleSubmit = async (e?: any) => {
    //e.preventDefault();
    let avatarUrl = "";

    if (image) {
      const { data, error } = await supabase.storage
        .from("application")
        .upload(`receipt/${Date.now()}`, image);

      if (error) {
        console.log(error);
      }
    }
  };

  const handleDownLoad = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download("admin/1662205999133");

    console.log(data, error);
  };

  const handleGetPath = async () => {
    const { publicURL, error } = supabase.storage
      .from("avatars")
      .getPublicUrl("admin/1662207408855");

    console.log(publicURL, error);
    setPath(publicURL!);
  };

  const items = [
    { title: "Mantine", href: "test/aaa" },
    { title: "Mantine hooks", href: "test/lll" },
    { title: "use-id", href: "aaa/yyy" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <div>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
    </div>
  );
};

export default Profile;
