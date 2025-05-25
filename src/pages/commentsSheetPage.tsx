import { Link, useParams } from "@tanstack/react-router"

export default function CommentsSheetPage() {
    const { sheetId } = useParams({ from: '/registers/$sheetId/comments' });

    return (
        <p>Ceci est la section commentaires de la fiche : {sheetId}</p>
    )
}