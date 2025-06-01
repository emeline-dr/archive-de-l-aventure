import { useRouter } from '@tanstack/react-router';
import { fetchWithAuth } from '../utils/fetchWithAuth';

type DeleteButtonProps = {
    sheetId: number;
};

export default function DeleteButton({ sheetId }: DeleteButtonProps) {
    const router = useRouter();
    const currentPath = router.state.location.pathname;

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette fiche ?");
        if (!confirmed) return;

        try {
            const response = await fetchWithAuth(`https://apidnd.up.railway.app/api/sheet/${sheetId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const isOnDetailPage = /^\/myCharacters\/\d+$/.test(currentPath);

                if (isOnDetailPage) {
                    router.navigate({ to: '/myCharacters' });
                } else {
                    window.location.reload();
                }
            } else {
                const errorData = await response.json();
                alert(`Erreur lors de la suppression : ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            alert('Une erreur est survenue lors de la suppression.');
            console.error(error);
        }
    };
    return (
        <button onClick={handleDelete}
            className="size-[40px] self-center rounded-sm text-lg bg-red-700 hover:bg-red-900 hover:border-2 hover:border-background flex flex-wrap justify-center content-center cursor-pointer">
            <i className="fa-solid fa-trash text-background"></i>
        </button>
    )
}