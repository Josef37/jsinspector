import React from 'react';
import { html as diff2html } from "diff2html";
import "diff2html/bundles/css/diff2html.min.css"

const Diff = ({ diff }) => {
    const html = diff2html(diff, {
        drawFileList: false,
        outputFormat: 'side-by-side'
    })
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Diff;