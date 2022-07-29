import React, {useState} from "react";
import {dbService, storageService} from "../fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {deleteObject, ref} from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {isElement} from "react-dom/test-utils";
import {v4 as uuidv4} from "uuid";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if ( ok ) {
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            console.log(nweetObj.attachmentUrl);

            const deleteObj = ref(storageService, nweetObj.attachmentUrl);
            await deleteObject(deleteObj);


        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const ok = window.confirm("Are you sure you want to update this nweet?");
        if ( ok ) {
            await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet }).then(toggleEditing);

        }
    }
    const onChange = (event) => {
        const {target: {value}} = event
        setNewNweet(value);

    }
    return (
        <div className="nweet">
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input
                                type="text"
                                onChange={onChange}
                                placeholder="Edit your nweet"
                                value={newNweet}
                                required
                            />
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                    </>
                    ) : (
                        <>
                            <h4>{nweetObj.text}</h4>
                            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl } width="50px" height="50px"/> }
                            {isOwner &&
                                (
                                <>
                                    <div className="nweet__actions">
                                        <span onClick={onDeleteClick}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </span>
                                        <span onClick={toggleEditing}>
                                            <FontAwesomeIcon icon={faPencilAlt}/>
                                        </span>
                                    </div>
                                </>
                                )
                            }
                        </>
                    )

            }

        </div>
    )
}
export default Nweet