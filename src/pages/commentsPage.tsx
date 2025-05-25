import Sidebar from "../components/sidebar";
import BackgroundIcon from "../components/backgroundIcon";
import { useState } from "react";
import { TiptapEditor } from "../components/texteditor/texteditor";

export default function CommentsComponent() {
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen text-[#2c2c2c] font-uncial-antiqua relative">
      <div className="flex">
        <Sidebar></Sidebar>

        <main className="flex-1 p-8 px-20">
          <div className="flex items-center gap-2 text-sm text-[#2b2c2b] font-semibold">
            <button className="bg-[#2b2c2b] text-[#6cf7d4]  rounded-full breadcrumb">
              Les registres
            </button>

            <button className="bg-[#2b2c2b] text-[#6cf7d4]  rounded-full breadcrumb">
              Fiche de Arlahne
            </button>

            <button className="bg-[#2b2c2b] text-white  rounded-full breadcrumb">
              Commentaires
            </button>
          </div>

          <h2 className="text-2xl font-bold mt-6 mb-2 underline">
            Commentaires de la fiche de Arlahne
          </h2>
          <p className="text-right text-sm italic mb-4">Le 09/05/2025, 23:57</p>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-1">Kymeria</h3>
            <div className="bg-[#e8dcc1] p-4 rounded text-sm leading-relaxed">
              Nullam at dui ac nunc laoreet euismod sit amet non diam. Vivamus
              viverra eu lectus ac tristique. Donec auctor pretium dignissim.
              Praesent vestibulum consectetur magna, eget iaculis massa
              vestibulum eu. Nulla elit elit, mattis sit amet est id, blandit
              ullamcorper lacus. Curabitur lacinia semper massa id sagittis.
              Phasellus consequat quam nec ligula hendrerit, ac facilisis tortor
              elementum. Nunc sapien nisi, semper at purus quis, semper blandit
              enim. Sed condimentum eu mauris id porttitor. Integer interdum ac
              est dictum rutrum. Aliquam a turpis elementum, pretium nunc
              congue, facilisis nibh.
            </div>
          </div>
          <div className="bg-[#f9edcd] border border-[#e2c799] p-4 rounded">
            <TiptapEditor value={comment} onChange={setComment} />
          </div>
        </main>
      </div>

      <BackgroundIcon></BackgroundIcon>
    </div>
  );
}
