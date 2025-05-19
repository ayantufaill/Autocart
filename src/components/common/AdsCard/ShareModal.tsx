import { Button, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import LinkIcon from "@mui/icons-material/Link";

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

        <Stack>
          <input
            style={{
              border: "1px solid #CACACA",
              outline: "none",
              height: "33px",
            }}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elitd"
          />
          <Button>
            Copy <LinkIcon sx={{ color: "#FFF" }} />
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ShareAdModal;
