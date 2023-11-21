import { toast } from "react-toastify";

type ToastType = "error" | "success";
export const showToastMessage = (toastType: ToastType, message: string) => {
  toast[toastType](message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
