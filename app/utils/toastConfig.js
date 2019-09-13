import { toast } from 'react-toastify';

export const statusType = {
  error: 'error',
  success: 'success',
  warning: 'warn',
  info: 'info',
};
export const messagetype = {
  promiseFailed: 'promiseFailed',
  wrongCode: 'wrongCode',
  registerSuccess: 'registerSuccess',
  registerFailed: 'registerFailed',
  addressRegisterFailed: 'addressRegisterFailed',
  notCovering: 'notCovering',
  addressRemoveFailed: 'addressRemoveFailed',
  addressSelectFailed: 'addressSelectFailed',
};

const toasterConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const toaster = (status, message, position) => {
  switch (status) {
    case statusType.error:
      toast.error(message, {
        ...toasterConfig,
        position,
      });
      break;
    case statusType.success:
      toast.success(message, {
        ...toasterConfig,
        position,
      });
      break;
    case statusType.warning:
      toast.warn(message, {
        ...toasterConfig,
        position,
      });
      break;
    default:
      toast.info(message, {
        ...toasterConfig,
        position,
      });
      break;
  }
  return true;
};

export default toaster;
