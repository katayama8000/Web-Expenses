import { Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
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

  const [text, setText] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const handlePopstate = () => {
    const isDiscardedOK = confirm(
      "保存されていないデータは削除されますが、よろしいですか？"
    );
    if (isDiscardedOK) {
      // OKの場合、historyAPIで戻るを実行します。
      window.history.back();
      setIsEdited(false);
    }
    // キャンセルの場合、 ダミー履歴を挿入して「戻る」を1回分吸収できる状態にする
    history.pushState(null, "", null);
  };

  useEffect(() => {
    // 編集中になったとき、現在のページを履歴に挿入し、handlePopstateをイベント登録
    if (isEdited) {
      // ダミー履歴を挿入して「戻る」を1回分吸収できる状態にする
      //history.pushState(null, "", null);
      window.addEventListener("popstate", handlePopstate, false);
    }
    // 他のページに影響しないようclear
    return () => {
      window.removeEventListener("popstate", handlePopstate, false);
    };
  }, [isEdited]);

  return (
    <div>
      {/* reload */}
      <div>
        <div>
          <h1>投稿画面</h1>
          <form>
            <textarea
              rows={10}
              cols={60}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setIsEdited(true);
              }}
            ></textarea>
          </form>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary mt-3 me-3"
              // 保存したときは、編集中フラグをfalseにする
              onClick={() => setIsEdited(false)}
            >
              保存する
            </button>
            <button className="btn btn-primary mt-3">投稿する</button>
          </div>
        </div>
      </div>
      {/* storaage */}
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
              onChange={(e) => {
                console.log(e.target.files?.[0]);
                //setImage(e.target.files?.[0]);
              }}
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
    </div>
  );
};

export default Profile;
