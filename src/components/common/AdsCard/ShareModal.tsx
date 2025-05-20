import { Button, Modal, Snackbar, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import LinkIcon from "@mui/icons-material/Link";
import Link from "next/link";
import { Check } from "@mui/icons-material";
import { useState } from "react";

interface ShareAdModalProps {
  open: boolean;
  handleClose: () => void;
  //   handleDelete: () => void;
}

const ShareAdModal: React.FC<ShareAdModalProps> = ({
  open,
  handleClose,
  //   handleDelete,
}) => {
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();
  const styles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalWrapper: {
      bgcolor: "#FFF",
      width: "340px",
      // height: "140px",
      borderRadius: 3,
      py: 3,
      justifyContent: "space-between",
      gap: "36px",
      px: "16px",
    },
  };

  const shareActions = [
    {
      icon: "/images/facebook-icon.svg",
      title: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      icon: "/images/whatsapp-icon.png",
      title: "WhatsApp",
      link: "https://web.whatsapp.com/",
    },
    {
      icon: "/images/instagram-icon.svg",
      title: "Instagram",
      link: "https://www.instagram.com/",
    },
    { icon: "/images/x-icon.svg", title: "X", link: "https://www.x.com" },
  ];

  const action = (
    <Check sx={{ color: "#FFF", bgcolor: "#07B007", borderRadius: "50%" }} />
  );

  return (
    <Modal sx={styles.modal} open={open} onClose={handleClose}>
      <Stack sx={styles.modalWrapper}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 600, textAlign: "center" }}
        >
          Share to
        </Typography>

        <Stack direction={"row"} sx={{ gap: "30px" }}>
          {shareActions.map((item, index) => (
            <Stack
              spacing={2}
              alignItems={"center"}
              key={index}
              onClick={() => router.push(item.link)}
            >
              <Image src={item.icon} alt={item.title} width={24} height={24} />
              <Typography sx={{ fontSize: "14px", color: "#1F2937" }}>
                {item.title}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction={"row"}
          sx={{
            border: "1px solid #CACACA",
            borderRadius: "8px",
            px: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            py: "10px",
          }}
        >
          <Link
            onClick={handleClose}
            href={"/"}
            style={{
              textDecoration: "none",
              color: "#9CA3AF",
              fontSize: "14px",
            }}
          >
            lorem ipsum
          </Link>
          <Button
            onClick={() => {
              navigator.clipboard.writeText("lorem ipsum");
              setSnackbarOpen(true);
            }}
            sx={{
              width: "54px",
              height: "17px",
              bgcolor: "#1D4ED8",
              px: "8px",
              py: "6px",
            }}
          >
            <Typography sx={{ fontSize: "10px", color: "#FFF", pt: "3px" }}>
              Copy
            </Typography>
            <LinkIcon
              sx={{
                color: "#FFF",
                width: 15,
                height: 15,
                transform: "rotate(305deg)",
              }}
            />
          </Button>
        </Stack>
        <Snackbar
          sx={{ width: "250px", mx: "auto" }}
          open={SnackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          action={action}
          message="Link copied!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Stack>
    </Modal>
  );
};

export default ShareAdModal;
