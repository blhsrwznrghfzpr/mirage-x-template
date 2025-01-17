import WebSocket from "ws";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MisskeyWsMessage, Note } from "./type";

export const useMisskey = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNotes = useCallback((notes: Note[]) => {
    setNotes((prevNotes) =>
      [
        // avatarUrlがNeosで正常に読まれないので、URLデコードしておく
        ...notes.map((note) => {
          const avatarUrl = decodeURIComponent(
            note.user.avatarUrl.match(/\?url=(.*)&/)?.[1] ?? ""
          );
          return {
            ...note,
            user: {
              ...note.user,
              avatarUrl,
            },
          };
        }),
        ...prevNotes,
      ].splice(-100)
    );
  }, []);

  useEffect(() => {
    // ストリーミングAPIに接続
    const ws = new WebSocket("wss://misskey.neos.love/streaming");
    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          type: "connect",
          body: {
            channel: "localTimeline",
            id: "testId",
          },
        })
      );
    });

    // ストリーミングAPIでメッセージを受け取ったらnotesに追加
    ws.on("message", (data) => {
      const message = JSON.parse(data.toString()) as MisskeyWsMessage;
      addNotes([message.body.body]);
    });

    // 接続が切れないように定期的にpingを送る
    const interval = setInterval(() => {
      ws.ping();
    }, 30000);

    // 初回ロード
    //https://misskey-hub.net/docs/api/endpoints/notes/local-timeline.html
    axios
      .post("https://misskey.neos.love/api/notes/local-timeline", {})
      .then((res) => {
        addNotes(res.data);
      });

    // unmount時にwsを閉じる
    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return { notes };
};
