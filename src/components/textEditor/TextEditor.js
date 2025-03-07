import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styled from "styled-components";
import { Button } from "@mui/material";

export function TextEditor({ limit, value, setValue, submit}) {
  const sizeLimit = limit ?? 4000;
  const [length, setLength] = useState(0);

  const handleInit = (evt, editor) => {
    setLength(editor.getContent({ format: "text" }).length);
  };

  const handleUpdate = (value, editor) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= sizeLimit) {
      setValue(value);
      setLength(length);
    }
  };

  const handleBeforeAddUndo = (evt, editor) => {
    const textLength = editor.getContent({ format: "text" }).length;
    if (textLength > sizeLimit) {
      evt.preventDefault();
    }
  };

  return (
    <StyledWrapper className="animate__animated animate__fadeIn animate__slower">
      <Editor
        apiKey="b2mjlchj9oig4j8de3o60g2cqwemte7h9mo7lv648pf7gnoi"
        onInit={handleInit}
        onEditorChange={handleUpdate}
        onBeforeAddUndo={handleBeforeAddUndo}
        value={value}
        init={{
          height: 200,
          menubar: true,
          selector: 'textarea',
          mobile: {
            theme: 'mobile',
          },
          max_width: '100%',
          mode: 'exact',
          plugins: [
            "autoresize",
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div id="button-container">
        <p><em>Remaining: {sizeLimit - length}</em></p>
        <Button variant="contained" color="primary" onClick={ submit } disabled={!value}>Enviar</Button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 0.2em auto 0.5em auto;

  & .mce-tinymce {
    width: 96% !important;
    margin: 0 auto !important;
  }

  & >:not(:last-child) {
    flex: 0 1 100%;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-bottom: 0.5em;
  }

  & > #button-container{
    flex: 0 1 88%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    & > * {
      flex: 0 1 30%;
    }

    & > p {
      text-align: left;
      margin: 0.5em 1em;
      color: gray;
      max-width: max-content;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 0.2em 0.5em;
      border-radius: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border: 1px solid rgba(0, 0, 0, 0.3);
    }
    & > button {
    max-width: 7em;
    padding: 0.5em;
    font-size: 1em;
      &:disabled {
        background-color: #ccc;
      }
    }
  }
`;
