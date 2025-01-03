import {createRoot} from "react-dom/client"
import "./shared/styles/index.scss"
import {Provider} from "react-redux";
import {store} from "@/app/store";
import App from "@/app/App";


createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
