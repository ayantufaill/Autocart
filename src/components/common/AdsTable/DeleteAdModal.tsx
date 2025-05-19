import { Button, Modal, Stack, Typography } from "@mui/material";

interface DeleteAdModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteAdModal: React.FC<DeleteAdModalProps> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  const styles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalWrapper: {
      bgcolor: "#FFF",
      width: "200px",
      height: "140px",
      borderRadius: 3,
      py: 3,
      justifyContent: "space-between",
    },
  };
  return (
    <Modal sx={styles.modal} open={open} onClose={handleClose}>
      <Stack sx={styles.modalWrapper}>
        <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
          Are you sure, you want to Delete Ad?
        </Typography>
        <Stack
          sx={{ px: 2, justifyContent: "flex-end" }}
          spacing={2}
          direction={"row"}
        >
          <Button
            size="small"
            sx={{ fontSize: "12px", color: "black" }}
            variant="text"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            size="small"
            sx={{ fontSize: "12px", bgcolor: "#DC2626" }}
            variant="contained"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default DeleteAdModal;
