import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function DeleteModal({ setDeleteVisible, handleDelete }) {
    // const [deleteVisible, setDeleteVisible] = useState(false);

    return (
        <Modal>
            <DeleteButton onClick={() => handleDelete(workout._id)}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete Workout</span>
            </DeleteButton>
            <DeleteButton onClick={() => setDeleteVisible(false)}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Cancel</span>
            </DeleteButton>
            Hallo Modal shit
        </Modal>
    )
}

const Modal = styled.div`
position: fixed;
z-index: 20;
bottom: 0;
width: 100%;
background-color: rgb(25, 24, 28);
height: 200px;
`

const DeleteButton = styled.button`
display: flex;
color:rgb(255, 81, 81);
gap: 10px;
font-size: 1rem;
align-items: center;
justify-content: center;
flex-direction: row;
text-decoration: none;
background-color: #292830;
border-radius: 25px;
border: none;
padding: 10px
`