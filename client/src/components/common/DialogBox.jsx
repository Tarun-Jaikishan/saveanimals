import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export default function DialogBox({
  open,
  setOpen,
  children,
  doNotClose = false,
}) {
  const handleClose = () => {
    if (!doNotClose) setOpen(false);
  };

  return (
    <div>
      <Dialog sx={{ minWidth: "2rem" }} open={open} onClose={handleClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
