import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";

type CardType = "gold" | "silver" | "bronze";
type ProfileType = "teacher" | "student";

type TeacherProps = {
  type?: CardType;
  imageUrl: string;
};

type StudentProps = {
  id: string;
  grade: number;
  roll_no: number;
  imageUrl: string;
};

type Props = {
  name: string;
  profileType: ProfileType;
  district?: string;
  block?: string;
  studentDetails?: StudentProps;
  teacherDetails?: TeacherProps;
};

const ProfileCard = ({
  name,
  profileType,
  district,
  block,
  studentDetails,
  teacherDetails,
}: Props) => {
  const getImageURL = () => {
    if (profileType === "teacher") {
      return teacherDetails?.imageUrl || "";
    } else if (profileType === "student") {
      return studentDetails?.imageUrl || "";
    }
    return "";
  };

  const imageURL = getImageURL();
  const UDISE = localStorage.getItem("udise");

  return (
    <Card
      className={clsx(styles.profileCard, {
        [styles.teacherCard]: profileType === "teacher",
        [styles.studentCardContainer]: profileType === "student",
        [styles.goldCard]: teacherDetails?.type === "gold",
        [styles.silverCard]: teacherDetails?.type === "silver",
        [styles.bronzeCard]: teacherDetails?.type === "bronze",
      })}
    >
      <Typography
        component="p"
        className={clsx(styles.profileName, {
          [styles.TeacherName]: profileType === "teacher",
          [styles.studentName]: profileType === "student",
          [styles.goldName]: teacherDetails?.type === "gold",
          [styles.silverName]: teacherDetails?.type === "silver",
          [styles.bronzeName]: teacherDetails?.type === "bronze",
        })}
        fontWeight={800}
      >
        {name}
      </Typography>
      <hr
        className={clsx(styles.line, {
          [styles.goldLine]: teacherDetails?.type === "gold",
          [styles.silverLine]: teacherDetails?.type === "silver",
          [styles.bronzeLine]: teacherDetails?.type === "bronze",
          [styles.defaultLine]: profileType === "student",
        })}
      ></hr>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        margin={"0px 17px"}
        justifyContent={"space-between"}
      >
        <Box width={"50%"}>
          {profileType === "teacher" && (
            <>
              <Box display={"flex"} alignItems={"center"}>
                जनपद :
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    color: "#2F3293",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  {district || "Agra"}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} margin={"10px 0"}>
                UDISE:
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    color: "#2F3293",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  {UDISE}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                ब्लॉक :
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    color: "#2F3293",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  {block}
                </Typography>
              </Box>
            </>
          )}
          {profileType === "student" && studentDetails && (
            <>
              <Box display={"flex"} alignItems={"center"}>
                जनपद :
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    color: "#2F3293",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  {district || "AGRA"}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} margin={"10px 0"}>
                UDISE:
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    color: "#2F3293",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  {studentDetails.id}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                आखरी आकलन :
                <Typography
                  component="p"
                  sx={{
                    fontWeight: "600",
                    color: "#2F3293",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  {studentDetails.roll_no}
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Box
          margin={"auto"}
          width={"50%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
          >
            {typeof window === "undefined" ? (
              <img
                className={styles.image}
                src={imageURL}
                width={profileType === "teacher" ? 47 : 69}
                height={profileType === "teacher" ? 74 : 101}
                alt={profileType === "teacher" ? "सर्व शिक्षा अभियान" : "icon"}
              />
            ) : (
              <Image
                className={styles.image}
                src={imageURL}
                width={profileType === "teacher" ? 47 : 69}
                height={profileType === "teacher" ? 74 : 101}
                alt={profileType === "teacher" ? "सर्व शिक्षा अभियान" : "icon"}
              />
            )}
          </Box>
          {profileType === "teacher" && (
            <Typography
              component="p"
              className={styles.bottomText}
              fontWeight={600}
              fontSize={"12px"}
            >
              मई में आपके 50+ छात्र निपुण हैं 🎉
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
  <Box display={"flex"} alignItems={"center"} margin={"10px 0"}>
    {label} :
    <Typography
      component="p"
      sx={{
        fontWeight: "600",
        color: "#2F3293",
        fontSize: "14px",
        marginLeft: "8px",
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default ProfileCard;
