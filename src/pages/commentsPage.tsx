import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";

import { useSheets } from "../api/sheetApi";
import { useCommentsBySheetId } from "../api/commentApi";

import Sidebar from "../components/sidebar";
import BackgroundIcon from "../components/backgroundIcon";
import { TiptapEditor } from "../components/texteditor/texteditor";

export default function CommentsComponent() {
  const [comment, setComment] = useState("");
  const { sheetId } = useParams({ from: '/registers/$sheetId/comments' });

  const comments = useCommentsBySheetId(Number(sheetId))

  const { data, isLoading } = useSheets(Number(sheetId));

  if (comments.isLoading || !comments.data) return <div>Chargement...</div>;
  if (isLoading || !data) return <div>Chargement...</div>;

  const { sheet } = data;

  return (
    <div className='pageContenant flex flex-wrap h-full'>
      <Sidebar></Sidebar>

      <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
        <div className='flex flex-wrap start gap-y-[8px]'>
          <div className="breadcrumb pe-[16px] underline text-accent">
            <Link to="/registers">Les registres</Link>
          </div>
          <div className="breadcrumb pe-[16px] underline text-accent">
            <Link to={`/registers/${sheet.id}`}>
              Fiche de {sheet.firstname} {sheet.lastname ? sheet.lastname : ''}
            </Link>
          </div>
          <div className="breadcrumb text-background">
            Commentaires
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-[40px]">
          <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline mb-[40px]'>
            Commentaires de la fiche de {sheet.firstname} {sheet.lastname ? sheet.lastname : ''}
          </h2>

          <div className="mt-[40px] mb-[80px] w-full flex flex-wrap gap-[40px]">
            {comments.data.map((comment) => (
              <div className="w-full">
                <div className="flex flex-wrap justify-between w-full font-uncial-antiqua tracking-[10%]">
                  <h3 className="text-2xl mb-[8px]">{comment.user_id}</h3>
                  <span className="text-base"></span>
                </div>
                <div className="bg-primary p-[8px] rounded-[5px] text-base w-full tracking-[10%]">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>

          <TiptapEditor value={comment} onChange={setComment} />
        </div>
      </div>

      <BackgroundIcon></BackgroundIcon>
    </div >
  );
}
