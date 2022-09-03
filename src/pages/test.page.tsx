import { Button } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
const Profile = () => {
  const [image, setImage] = useState<File | undefined>();
  const [website, setWebsite] = useState("");
  const [path, setPath] = useState("");

  const handleSubmit = async (e?: any) => {
    //e.preventDefault();
    let avatarUrl = "";

    if (image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`admin/${Date.now()}`, image);

      console.log(data);

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

  return (
    <div>
      {path && <Image src={path} width={200} height={200} alt="aaa" />}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="avatar">Choose Avatar:</label>
            <input
              type="file"
              accept={"image/jpeg image/png"}
              onChange={(e) => {
                console.log(e.target.files?.[0]);
                setImage(e.target.files?.[0]);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website:</label>
            <input
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
            />
          </div>

          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            storage
          </Button>
          <Button
            onClick={() => {
              handleDownLoad();
            }}
          >
            DownLoad
          </Button>
          <Button
            onClick={() => {
              handleGetPath();
            }}
          >
            getPath
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
