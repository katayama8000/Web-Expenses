import { Button } from "@mantine/core";
import React, { useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
const Profile = () => {
  const [image, setImage] = useState<File | undefined>();
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<File | undefined>();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let avatarUrl = "";

    if (image) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}`, image);

      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {message && message}

      <h1>Profile</h1>

      {avatarUrl ? (
        <img
          src={`https://rmzhnvojmpqewraookpz.supabase.in/storage/v1/object/public/${avatarUrl}`}
          width={200}
          alt=""
        />
      ) : (
        "No Avatar set"
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">Choose Avatar:</label>
          <input
            type="file"
            accept={"image/jpeg image/png"}
            onChange={(e) => setImage(e.target.files?.[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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

        <Button type={"submit"}>Save profile!</Button>
      </form>
    </div>
  );
};

export default Profile;
