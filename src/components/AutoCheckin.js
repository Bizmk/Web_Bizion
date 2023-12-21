import React, { useState } from "react";
import classnames from "classnames";
import { IoMdAdd } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AutoCheckin.css';
import Camara from './Camara';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  ButtonDropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle,
} from "reactstrap";




function AutoCheckin ()  {
    const [state, setState] = React.useState({
      imagePreview: null,
      picFocus: false,
      nameFocus: false,
      emailFocus: false,
      reazonFocus: false
    });
    const [dropdownOpen, setOpen] = useState(false);
    const [dropdownOpen1, setOpen1] = useState(false);
    const [dropdownOpen2, setOpen2] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setState({ ...state, imagePreview: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    };

    const handleCapture = (imageSrc) => {
      setState({ ...state, imagePreview: imageSrc });
      setCapturedImage(imageSrc);
      setShowCamera(false); // Hide camera after capture
    };

    const toggleDropdown = () => {
      setOpen(!dropdownOpen);
    };

    const toggleDropdown1 = () => {
      setOpen1(!dropdownOpen1);
    };

    const toggleDropdown2 = () => {
      setOpen2(!dropdownOpen2);
    };

    React.useEffect(() => {
      document.body.classList.toggle("login-page");
      return function cleanup() {
        document.body.classList.toggle("login-page");
      };
    });
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    
                     <CardTitle className="card-register" tag="h2">Registro</CardTitle>
                  </CardHeader>
                  <CardBody>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": state.picFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <div className="image-container">
                          {state.imagePreview ? (
                            <img
                              src={state.imagePreview}
                              alt="preview"
                              className="image-preview"
                            />
                          ) : (
                            <div className="image-placeholder"></div>
                          )}
                          <Button className="add-image-button" onClick={() => setShowCamera(true)}>
                            <IoMdAdd />
                          </Button>
                        </div>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="imageUpload"
                      onFocus={(e) => setState({ ...state, picFocus: true })}
                      onBlur={(e) => setState({ ...state, picFocus: false })}
                    />
                  
                    
                  </InputGroup>

                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.nameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Nombre Completo"
                        type="text"
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      />
                    </InputGroup>
                    {showCamera && <Camara onCapture={handleCapture} />}
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.emailFocusFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Correo Electronico"
                        type="email"
                        onFocus={(e) => setState({ ...state, emailFocus: true })}
                        onBlur={(e) => setState({ ...state, emailFocus: false })}
                      />
                    </InputGroup>
                    <ButtonDropdown  className="button-dropdown" isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret color="primary">
                          ¿De qué empresa nos visita?
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Really Long Action</DropdownItem>
                        </DropdownMenu>

                    </ButtonDropdown>
                    <ButtonDropdown className="button-dropdown" isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                        <DropdownToggle caret color="primary">
                          ¿A dónde te diriges?
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Really Long Action</DropdownItem>
                        </DropdownMenu>

                    </ButtonDropdown>
                    <ButtonDropdown className="button-dropdown" isOpen={dropdownOpen2} toggle={toggleDropdown2}>
                        <DropdownToggle caret color="primary">
                          ¿A dónde te diriges?
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Really Long Action</DropdownItem>
                        </DropdownMenu>

                    </ButtonDropdown>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": state.reazonFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="¿Razón de tu visita?"
                        type="text"
                        onFocus={(e) => setState({ ...state, reazonFocus: true })}
                        onBlur={(e) => setState({ ...state, reazonFocus: false })}
                      />
                    </InputGroup>

                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="register_button"
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      Registar Visita 
                    </Button>
                    
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  };
  
  export default AutoCheckin;
  