import { deleteData } from "../../firebase/firestoreUtils";

interface DeleteFromFirestoreBtnProps {
  collectionName: string;
  itemId: string;
  onDelete: (id: string) => void; // Callback to update the local state
}

const DeleteFromFirestoreBtn = ({
  collectionName, 
  itemId, 
  onDelete,
}: DeleteFromFirestoreBtnProps) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      // Call Firestore delete function
      await deleteData(collectionName, itemId);
      // Call the callback to update local state
      onDelete(itemId);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteFromFirestoreBtn;