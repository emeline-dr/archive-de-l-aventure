import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import dayjs from 'dayjs'
import DOMPurify from 'dompurify';

import { useSheets } from "../api/sheetApi";
import { useCommentsBySheetId } from "../api/commentApi";
import { getDecodedJwt } from "../utils/AuthUtils";
import { fetchWithAuth } from "../utils/fetchWithAuth";

import Sidebar from "../components/sidebar";
import BackgroundIcon from "../components/backgroundIcon";
import { TiptapEditor } from "../components/texteditor/texteditor";

export default function CommentsComponent() {
  const [comment, setComment] = useState("");
  const { sheetId } = useParams({ from: '/registers/$sheetId/comments' });
  const decodedToken = getDecodedJwt();
  const userId = decodedToken?.id

  const comments = useCommentsBySheetId(Number(sheetId))

  const { data, isLoading } = useSheets(Number(sheetId));

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const sanitizedComment = DOMPurify.sanitize(comment);

    try {
      const response = await fetchWithAuth("https://apidnd.up.railway.app/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sanitizedComment,
          user_id: userId,
          sheet_id: Number(sheetId),
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi du commentaire");

      comments.refetch?.();
      setComment(""); // Vide le champ
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    }
  };


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
                  <h3 className="text-2xl mb-[8px]">{comment.username}</h3>
                  <span className="text-base">
                    Le {dayjs(comment.create_at).format('DD/MM/YYYY, HH:mm')}
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }}
                  className="bg-primary p-[8px] rounded-[5px] text-base w-full tracking-[10%]">
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto gap-[40px] flex flex-col">
            <TiptapEditor value={comment} onChange={setComment} />
            <button
              onClick={handleAddComment}
              className="btn btn-text"
            >
              Ajouter le commentaire
            </button>
          </div>
        </div>
      </div>

      <BackgroundIcon></BackgroundIcon>
    </div >
  );
}
