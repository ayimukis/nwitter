import React, {useEffect, useState} from "react";
import {authService, dbService} from "../fbase";
import {getAuth, updateProfile} from "firebase/auth";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {useHistory} from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"))

        const nweets = await getDocs(q);

        console.log(nweets.docs.map(doc => doc.data()));
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {

            await updateProfile(authService.currentUser, {
                displayName: newDisplayName,
            })
            refreshUser();
        }
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value)
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
};
export default Profile