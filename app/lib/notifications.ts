import toast from 'react-hot-toast';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  duration?: number;
  id?: string;
}

export const showNotification = (
  message: string,
  type: NotificationType = 'info',
  options?: NotificationOptions
) => {
  const toastOptions = {
    duration: options?.duration || 4000,
    id: options?.id,
  };

  switch (type) {
    case 'success':
      return toast.success(message, toastOptions);
    case 'error':
      return toast.error(message, toastOptions);
    case 'warning':
      return toast(message, {
        ...toastOptions,
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
        },
      });
    case 'info':
    default:
      return toast(message, toastOptions);
  }
};

// Convenience functions for common notifications
export const showSuccess = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'success', options);

export const showError = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'error', options);

export const showWarning = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'warning', options);

export const showInfo = (message: string, options?: NotificationOptions) =>
  showNotification(message, 'info', options);

// Hospital-specific notification functions
export const showLowStockAlert = (itemName: string, currentStock: number, threshold: number) =>
  showWarning(
    `Low stock alert: ${itemName} has ${currentStock} units remaining (threshold: ${threshold})`,
    { duration: 6000 }
  );

export const showOrderConfirmation = (orderId: string) =>
  showSuccess(`Order ${orderId} has been confirmed successfully`);

export const showOrderRejection = (orderId: string, reason?: string) =>
  showError(
    `Order ${orderId} has been rejected${reason ? `: ${reason}` : ''}`,
    { duration: 6000 }
  );

export const showExpiryAlert = (itemName: string, daysUntilExpiry: number) =>
  showWarning(
    `Expiry alert: ${itemName} expires in ${daysUntilExpiry} days`,
    { duration: 6000 }
  );

export const showSystemError = (message: string = 'An unexpected error occurred') =>
  showError(message, { duration: 6000 });

// Dismiss specific notification
export const dismissNotification = (toastId: string) => {
  toast.dismiss(toastId);
};

// Dismiss all notifications
export const dismissAllNotifications = () => {
  toast.dismiss();
};