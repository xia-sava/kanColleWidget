import {Router} from "chomex";
import * as Controllers from "../Controllers/NotificationClickControllers";

let router = new Router(id => {
    const [name, ] = id.split(".");
    return {name};
});

router.on("mission", Controllers.OnMissionNotificationClicked);
router.on("recovery",Controllers.OnRecoveryNotificationClicked);
router.on("debug",   Controllers.OnDebugNotificationClicked);

const NotificationClickListener = router.listener();
export default NotificationClickListener;