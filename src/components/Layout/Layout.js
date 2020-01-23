import React from "react";
import Aux from "../../hoc/AuxComponent";
import classes from "./Layout.module.css"

const layout = props => (
    <Aux>
        <div>Tab, SideBar, Drawer</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
