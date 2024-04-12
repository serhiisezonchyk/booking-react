import React, { Dispatch, createContext, useEffect, useState } from 'react';

interface UploadwidgetProps {
  uwConfig: any;
  setState: Dispatch<React.SetStateAction<string[]>>;
}

interface CloudinaryScriptContextValue {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryScriptContextValue | undefined>(undefined);
const Uploadwidget = ({ uwConfig, setState }: UploadwidgetProps) => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);
  useEffect(() => {
    if (!loaded) return;
    const myWidget = (window as any)?.cloudinary?.createUploadWidget(uwConfig, (error: any, result: any) => {
      if (!error && result && result.event === 'success') {
        setState((prev: string[]) => [...prev, result.info.secure_url]);
      }
    });

    const uploadWidgetButton = document.getElementById('upload_widget');
    if (uploadWidgetButton) {
      const onClickHandler = () => myWidget.open();
      uploadWidgetButton.addEventListener('click', onClickHandler);

      return () => {
        setOpen(false);
        uploadWidgetButton.removeEventListener('click', onClickHandler);
      };
    }
  }, [open]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button disabled={open && !loaded} id="upload_widget" className="upload-button" onClick={() => setOpen(true)}>
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default React.memo(Uploadwidget);
export { CloudinaryScriptContext };
