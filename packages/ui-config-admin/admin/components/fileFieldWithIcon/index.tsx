import * as React from "react";
import { FileField } from "react-admin";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from '@mui/icons-material/Image';
// import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from '@mui/icons-material/Article';
const FileFieldWithIcon = (props: any) => {
  return (
    <div style={{ display: "flex" }}>
      {props?.isPdf ? (
        <PictureAsPdfIcon style={{ marginRight: "10px" }} />
      ) : (
        props?.isImage ? (
          <ImageIcon style={{ marginRight: "10px" }} />
        ):
        <ArticleIcon style={{ marginRight: "10px" }} />
      )}
      <FileField {...props} />{" "}
    </div>
  );
};

export default FileFieldWithIcon;
