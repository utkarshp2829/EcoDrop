import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Notification = ({ message, type = 'success', onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === 'success' ? 'bg-green-700' : 'bg-red-700';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`text-white px-5 py-4 rounded-lg shadow-lg flex items-start space-x-3 ${bgClass}`}>
        <div className="text-base font-medium">
          {message}
        </div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={onClose}
          className="ml-2 text-white/90 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;