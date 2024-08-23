import {ExclamationTriangleIcon} from "@heroicons/react/24/outline/index.js";
import {useState} from "react";

const GrayOut = () => {
    const [hidden, setHidden] = useState(false);

    return (
        <div onClick={() => setHidden(!hidden)} hidden={hidden}>
            <div className={"w-screen h-screen bg-black opacity-50 absolute top-0 left-0 z-50"}></div>

            {/*<div className={"bg-white p-4 shadow-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"}*/}
            {/*     onClick={(e) => e.stopPropagation()}>*/}
            {/*    <div className={"flex items-center mb-4"}>*/}
            {/*        <ExclamationTriangleIcon strokeWidth={2} className={"w-8 mr-2"}></ExclamationTriangleIcon>*/}
            {/*        You have unsaved changes!*/}
            {/*    </div>*/}

            {/*    <hr/>*/}

            {/*    <div>*/}
            {/*        Are you sure you want to leave?*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>
    )
}

export default GrayOut;