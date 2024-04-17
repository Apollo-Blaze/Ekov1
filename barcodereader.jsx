import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import './barcode.css'

const ImeiReader = () => {
    const [imei, setImei] = useState(null);

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'ImageStream',
                target: document.querySelector('#barcode-scanner'),
            },
            decoder: {
                readers: ['code_128_reader']
            }
        }, (err) => {
            if (err) {
                console.error('Failed to initialize Quagga:', err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            const code = data.codeResult.code;
            setImei(code);
            Quagga.stop();
        });

        return () => {
            Quagga.stop();
        };
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                Quagga.decodeSingle({
                    src: canvas.toDataURL(),
                    numOfWorkers: 0,
                    inputStream: {
                        size: img.width
                    },
                    decoder: {
                        readers: ['code_128_reader']
                    },
                });
            };
            img.src = imageUrl;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='barcon'>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <br></br>
            {imei && <p className="imei">IMEI: {imei}</p>}
            <div id="barcode-scanner" style={{ width: '100%', height: '200px' }}></div>
        </div>
    );
};

export default ImeiReader;
