import React from "react";
import css from './index.module.css'
import classNames from "classnames";

const FooterToolbar = (props: any) => {
    const {children, className , extra, ...restProps} = props
    return (
        <div className={classNames(className, css.toolbar)} {...restProps}>
            <div className={css.left}>{extra}</div>
            <div className={css.right}>{children}</div>
        </div>
    )

}

export default FooterToolbar