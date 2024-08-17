import {getAuth} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";

const useUpdate = () => {

    const updateSetting = (path, value, setActual) => {
        const uid = getAuth().currentUser.uid
        const dbRef = ref(getDatabase(), 'users/' + uid + '/' + path)

        return set(dbRef, value)
            .then(() => {
                setActual(value);
            })
    }

    return { updateSetting }
}

export default useUpdate;