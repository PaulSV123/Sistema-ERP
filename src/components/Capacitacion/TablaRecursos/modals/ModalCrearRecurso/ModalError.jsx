import React from 'react';
import useStyles from './styles/useStyles';
const ModalError = React.forwardRef(({ error }, ref) => {
  const styles = useStyles(); 

  return (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        <h3 className="text-center text-lg font-bold">
          {error}
        </h3>
        <button
          onClick={() => {}}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/48/000000/no-error.png"
            style={{ width: '1.5rem', height: '1.5rem' }}
            alt=""
          />
        </button>
      </div>
    </div>
  );
});

export default ModalError;
