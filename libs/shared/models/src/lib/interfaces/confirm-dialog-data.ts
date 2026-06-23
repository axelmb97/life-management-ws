export interface ConfirmDialogData {
  message: string;
  title?: string;
  acceptFn: () => void;
  acceptBtnTitle?: string;
  rejectFn?: () => void;
  rejectBtnTitle?: string;
}