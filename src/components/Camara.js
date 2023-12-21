import React, { Component } from 'react';
import { MdOutlineAddAPhoto } from "react-icons/md";
import Webcam from "react-webcam";
import {
    Button,   
  } from "reactstrap";
import './Camara.css';

export default class Camara extends Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    foto = () => {
        const captura = this.webcam.getScreenshot();
        this.props.onCapture(captura);
    };

    render() {
        return (
            <div className='camera-container'>
                <p className='camera-header'>Toma tu fotografía (Opcional)</p>
                <Webcam
                    audio={false}
                    height={250}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={250}
                    className='webcam-view'
                />
                <div className='camera-actions'>
                    <Button className='capture-button' onClick={this.foto}> 
                        <MdOutlineAddAPhoto size={24}/>
                    </Button>
                    <Button className='cancel-button' onClick={this.props.onCancel}>
                        Cancelar
                    </Button>
                </div>
            </div>
        );
    }
}