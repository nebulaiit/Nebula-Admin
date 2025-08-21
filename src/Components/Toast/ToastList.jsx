import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Toast.css';
import { removeToast } from ".././redux/toastSlice";

const ToastList = () => {
  const toasts = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => dispatch(removeToast(toast.id)), 5000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts, dispatch]);

  console.log('TOASTS IN RENDER:', toasts);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <p>{toast.message || '⚠️ NO MESSAGE'}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastList;
